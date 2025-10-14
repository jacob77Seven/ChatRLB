from ollama import chat
from ollama import ChatResponse
# from ..Backend.book_ir
from .book_ir import search_book

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
        context = self.get_Relevent_Material(userInput)
        content = f"Use the following pieces of context to answer the question at the end. If you don't know the answer, just say that you don't know, don't try to make up an answer.\n\n{context}\n\nQuestion: {userInput}\nHelpful Answer:"
        self.messages += [{'role': 'user', 'content': content}]
        newMessage = chat(
            model='gemma3:1b',
            messages=self.messages,
            stream=False,
            options={"num_predict":500}
        )
        self.messages += [{'role': 'assistant', 'content': newMessage.message.content}]
        return newMessage.message.content
    def get_Relevent_Material(self, query):
        fetchedData = ""
        results = search_book(query)
        for i, (passage, score) in enumerate(results, 1):
            print(f"\n--- Result {i} (Score: {score:.4f}) ---")
            print(passage[:500])  # Show the first 500 characters
            fetchedData += (passage[:500])  # Show the first 500 characters
        return fetchedData