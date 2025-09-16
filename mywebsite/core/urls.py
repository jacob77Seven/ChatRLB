from django.urls import path
from .views import chat_page, chatbot_reply
from . import views
from django.views.generic import TemplateView


urlpatterns = [
    path('', chat_page, name="home"),
   path('chatbot/', views.chatbot_reply, name='chatbot'),
     path("", TemplateView.as_view(template_name="index.html"), name="home"),
]