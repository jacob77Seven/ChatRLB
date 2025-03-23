from django.urls import path
from .views import index

urlpatterns = [
    path('', index, name='index'),  # This defines what to do at '/'
]
