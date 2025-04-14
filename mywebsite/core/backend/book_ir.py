
import pickle
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from pathlib import Path

current_directory = str(Path(__file__).parent)
print(current_directory)
# Load the chunked book data
with open(current_directory + "\\\\book_chunks.pkl", "rb") as f:
    chunks = pickle.load(f)

# Vectorize the text chunks using TF-IDF
vectorizer = TfidfVectorizer(stop_words='english')
tfidf_matrix = vectorizer.fit_transform(chunks)

def search_book(query, top_k=3):
    """Returns the top_k most relevant passages from the book for a given query."""
    query_vector = vectorizer.transform([query])
    similarities = cosine_similarity(query_vector, tfidf_matrix).flatten()
    top_indices = similarities.argsort()[-top_k:][::-1]
    return [(chunks[i], similarities[i]) for i in top_indices]

if __name__ == "__main__":
    print("📖 Welcome to the Book IR Search!")
    while True:
        query = input("\nEnter your question (or type 'exit' to quit): ")
        if query.lower() == "exit":
            break
        results = search_book(query)
        for i, (passage, score) in enumerate(results, 1):
            print(f"\n--- Result {i} (Score: {score:.4f}) ---")
            print(passage[:500])  # Show the first 500 characters
