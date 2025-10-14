# backend/voice_service/api_urls.py
from django.urls import path
from . import api_views

urlpatterns = [
    path("speak", api_views.speak_api, name="voice_speak"),
    path("transcribe", api_views.transcribe_api, name="voice_transcribe"),
    path("chat", api_views.chat_api, name="voice_chat"),
]