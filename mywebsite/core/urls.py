from django.urls import path
from .views import chat_page, chatbot_reply, GetVerseReferencesR, output, StartStudyModeR, StopStudyModeR
from . import views

urlpatterns = [
    path('', chat_page, name='chat_page'),
    path('chatbott/', views.chatbot_reply, name='chatbott'),
    path('get_verse_references/', GetVerseReferencesR, name='get_verse_references'),
    path('StartStudyMode/', StartStudyModeR, name='StartStudyMode'),
    path('StopStudyMode/', StopStudyModeR, name='StopStudyMode'),
    path('output/', output, name='output'),
]