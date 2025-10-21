from django.urls import path
from .views import chat_page, chatbot_reply
from . import views
from .views import start_backend, end_backend

urlpatterns = [
    path('', chat_page, name='chat_page'),
    path('chatbot/', views.chatbot_reply, name='chatbot'),
    path('get-verse-references/', views.GetVerseReferences, name='get_verse_references'),
]

urlpatterns = [
    path("api/start_backend/", start_backend, name="start_backend"),
    path("api/end_backend/", end_backend, name="end_backend"),
]
