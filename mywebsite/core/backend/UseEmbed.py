# Core LangChain components
from langchain_core.documents import Document

# Integrations for LOCAL embeddings and vector stores
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import Chroma

import json
import csv
import time

import configHandler
class Classifier:
    # Path to the JSON files
    CONFIG_PATH = "config.txt"

    config = configHandler.load_config(CONFIG_PATH)

    INPUT_PATH = config.get("train_path")
    TEST_PATH = config.get("test_path")
    persist_directory = config.get("embed_path")
    # RESULT_OUTPUT = "results.json"
    output_csv_file = config.get("results_path")

    # Initialize the MiniLM embedding model
    model_name = "sentence-transformers/all-MiniLM-L6-v2"
    embeddings = HuggingFaceEmbeddings(model_name=model_name)
    def LoadEmbeddings(self):
        print("Loading vectors.")
        # Load the saved vector store (for future use)
        loaded_vectorstore = Chroma(
            persist_directory=self.persist_directory,
            embedding_function=self.embeddings
        )
        retriever = loaded_vectorstore.as_retriever(search_kwargs={"k": 1})

    def Query(self, text):
        query = text
        results_with_scores = self.loaded_vectorstore.similarity_search_with_score(query, k=1)
        return(results_with_scores)