from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from ollama import chat
from ollama import ChatResponse
from .backend.chatbot import *
from django.conf import settings
import os, json, pyaudio
from vosk import Model, KaldiRecognizer
import markdown
from .backend.BackendStudyManager import *

# Create your views here.
from django.shortcuts import render

def chat_page(request):
    return render(request, 'index.html')

def chatbot_reply(request):
    model_manager = settings.MODEL_MANAGER
    if request.method == "POST":
        data = json.loads(request.body)
        user_input = data.get("message", "")
        # # TODO: Change the load time to when the server is created.
        # chat(model='gemma3:1b')
        # # Use local Ollama model to respond
        # response: ChatResponse = chat(model='gemma3:1b', messages=[
        #   {
        #     'role': 'user',
        #     'content': f'Respond to this query as a Christian apologist would: {user_input}',
        #   },
        # ])
        bot_reply = model_manager.gen_Response(user_input)
        formatted_bot_reply = markdown.markdown(bot_reply)
        # bot_reply = response.message.content # f"Jesus says: '{user_input}' is a great question to reflect on."
        GetVerseReferences()
        return JsonResponse({"reply": formatted_bot_reply})

    return JsonResponse({"error": "Invalid request"}, status=400)

@csrf_exempt
def stt_once(request):
    if request.method != "POST":
        return JsonResponse({"error": "POST only"}, status=405)

    rec = KaldiRecognizer(vosk_model, 16000)
    pa = pyaudio.PyAudio()
    stream = pa.open(format=pyaudio.paInt16, channels=1, rate=16000, input=True, frames_per_buffer=8192)
    stream.start_stream()

    # ~5 seconds capture (20 chunks of 4096 @16k)
    text = ""
    try:
        for _ in range(20):
            data = stream.read(4096, exception_on_overflow=False)
            if rec.AcceptWaveform(data):
                result = json.loads(rec.Result())
                t = result.get("text", "").strip()
                if t:
                    text = t
                    break
        if not text:
            final = json.loads(rec.FinalResult())
            text = final.get("text", "").strip()
    finally:
        stream.stop_stream(); stream.close(); pa.terminate()

    return JsonResponse({"text": text})