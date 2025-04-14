from django.apps import AppConfig
from .backend.chatbot import ModelManager

class CoreConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'core'
    def ready(self):
        from django.conf import settings
        settings.MODEL_MANAGER = ModelManager()