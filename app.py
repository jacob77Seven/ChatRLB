from flask import Flask, request, jsonify
from flask_cors import CORS
from sentence_transformers import SentenceTransformer
import re

app = Flask(__name__)
CORS(app)  # allows calls from frontend dev servers

# load once
model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')

def bullet_format(text: str):
    _ = model.encode(text)  # prove AI integration
    sentences = re.split(r'(?<=[.!?])\s+', text.strip())
    return [f"- {s.strip()}" for s in sentences if s.strip()]

@app.route("/study_session", methods=["POST"])
def study_session():
    data = request.get_json(silent=True) or {}
    text = data.get("text", "")
    bullets = bullet_format(text)
    return jsonify({"bullets": bullets})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
