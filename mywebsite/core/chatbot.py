from ollama import chat
from ollama import ChatResponse

class ModelManager:
    messages = []
    model = 0
    # @staticmethod
    def load_model(self):
        if self.model is None:
            self.model = chat(model='gemma3:1b')
    def clear_chat(self):
        self.messages = []
    def gen_Response(self, userInput):
        self.messages += [{'role': 'user', 'content': userInput}]
        newMessage = chat(
            model='gemma3:1b',
            messages=self.messages,
            stream=False,
            options={"num_predict":100}
        )
        self.messages += [{'role': 'assistant', 'content': newMessage.message.content}]
        return newMessage.message.content