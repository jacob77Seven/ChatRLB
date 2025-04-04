from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

# Create your views here.
from django.shortcuts import render

def chat_page(request):
    return render(request, 'index.html')

def chatbot_reply(request):
    if request.method == "POST":
        data = json.loads(request.body)
        user_input = data.get("message", "")

        # Replace with real logic or GPT call
        bot_reply = f"Jesus says: '{user_input}' is a great question to reflect on."

        return JsonResponse({"reply": bot_reply})

    return JsonResponse({"error": "Invalid request"}, status=400)