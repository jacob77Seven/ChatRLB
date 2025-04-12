from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from ollama import chat
from ollama import ChatResponse
from .chatbot import *
from django.conf import settings

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
        # bot_reply = response.message.content # f"Jesus says: '{user_input}' is a great question to reflect on."

        return JsonResponse({"reply": bot_reply})

    return JsonResponse({"error": "Invalid request"}, status=400)