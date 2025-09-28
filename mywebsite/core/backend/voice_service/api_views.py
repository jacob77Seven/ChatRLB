# backend/voice_service/api_views.py
import os
import io
import uuid
from pathlib import Path
from django.http import JsonResponse, HttpResponseBadRequest
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings

from core.backend.voice_service.ollama_voice import load_vosk_model, query_ollama
from vosk import KaldiRecognizer 
import wave


MODEL = None  # lazy-loaded

def get_model():
    global MODEL
    if MODEL is None:
        MODEL = load_vosk_model()
    return MODEL

def ensure_media_dirs():
    (Path(settings.MEDIA_ROOT) / "tts").mkdir(parents=True, exist_ok=True)
    (Path(settings.MEDIA_ROOT) / "uploads").mkdir(parents=True, exist_ok=True)


@csrf_exempt
@require_POST
def speak_api(request):
    """
    Body JSON: {"text":"hello world"}
    Returns: {"url": "/media/tts/<file>.wav"}
    """
    ensure_media_dirs()
    try:
        import json
        payload = json.loads(request.body.decode("utf-8"))
        text = (payload.get("text") or "").strip()
        if not text:
            return HttpResponseBadRequest("Missing text")
        # Save TTS to a file so the browser can play it
        import pyttsx3
        engine = pyttsx3.init()
        out_path = Path(settings.MEDIA_ROOT) / "tts" / f"{uuid.uuid4()}.wav"
        engine.save_to_file(text, str(out_path))
        engine.runAndWait()
        rel_url = settings.MEDIA_URL + "tts/" + out_path.name
        return JsonResponse({"url": rel_url})
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

@csrf_exempt
@require_POST
def transcribe_api(request):
    """
    Multipart form-data with field name 'audio' containing any audio blob.
    Returns: {"text": "..."}
    """
    ensure_media_dirs()
    f = request.FILES.get("audio")
    if not f:
        return HttpResponseBadRequest("Missing 'audio' file")

    # 1) Save upload to a temp file (whatever the format is)
    tmp_in = Path(settings.MEDIA_ROOT) / "uploads" / f"{uuid.uuid4()}_{f.name}"
    with open(tmp_in, "wb") as tmp:
        for chunk in f.chunks():
            tmp.write(chunk)

    # 2) Convert to 16k mono WAV using ffmpeg
    import ffmpeg
    wav_path = Path(settings.MEDIA_ROOT) / "uploads" / f"{uuid.uuid4()}.wav"
    (
        ffmpeg
        .input(str(tmp_in))
        .output(str(wav_path), ac=1, ar=16000, format="wav")
        .overwrite_output()
        .run(quiet=True)
    )
    tmp_in.unlink(missing_ok=True)

    # 3) Transcribe with Vosk
    model = get_model()
    rec = KaldiRecognizer(model, 16000)
    import wave, json as pyjson
    with wave.open(str(wav_path), "rb") as wf:
        while True:
            data = wf.readframes(4000)
            if not data:
                break
            rec.AcceptWaveform(data)
    result = pyjson.loads(rec.FinalResult()).get("text", "")
    return JsonResponse({"text": result})


@csrf_exempt
@require_POST
def chat_api(request):
    """
    End-to-end: audio -> STT -> LLM -> TTS file
    Multipart field 'audio' (same as transcribe); returns {"user_text", "bot_text", "audio_url"}.
    """
    # Reuse transcribe
    r = transcribe_api(request)
    if r.status_code != 200:
        return r
    import json
    user_text = json.loads(r.content.decode("utf-8"))["text"]

    bot_text = query_ollama(user_text)  # your function
    # Generate audio file
    ensure_media_dirs()
    import pyttsx3
    engine = pyttsx3.init()
    out_path = Path(settings.MEDIA_ROOT) / "tts" / f"{uuid.uuid4()}.wav"
    engine.save_to_file(bot_text, str(out_path))
    engine.runAndWait()
    rel_url = settings.MEDIA_URL + "tts/" + out_path.name
    return JsonResponse({"user_text": user_text, "bot_text": bot_text, "audio_url": rel_url})