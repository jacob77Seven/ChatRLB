from django.urls import path
from .views import chat_page, chatbot_reply
from . import views


urlpatterns = [
    path('', chat_page, name='chat_page'),
    path('chatbot/', views.chatbot_reply, name='chatbot'),
    path('get-verse-references/', views.GetVerseReferences, name='get_verse_references'),
]