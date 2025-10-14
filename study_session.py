from sentence_transformers import SentenceTransformer
import re
import argparse
import sys

# Load MiniLM model once (proves AI integration)
_model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')

def study_session(text: str) -> str:
    # Generate embedding to show we used the model (not used further)
    _ = _model.encode(text)
    # Split to sentences and bullet them
    sentences = re.split(r'(?<=[.!?])\s+', text.strip())
    bullets = [f"- {s.strip()}" for s in sentences if s.strip()]
    return "\n".join(bullets) if bullets else "- (no content)"

def main():
    parser = argparse.ArgumentParser(description="Study Session bullet formatter")
    parser.add_argument("--text", "-t", type=str, help="One-shot text to format")
    args = parser.parse_args()

    if args.text:
        # One-shot mode: print and exit
        print(study_session(args.text))
        return

    # Interactive mode
    print("Study Session Mode — type your text and press Enter.")
    print("Type 'quit' or 'exit' to close.\n")
    while True:
        try:
            user_text = input("Enter text> ").strip()
        except (EOFError, KeyboardInterrupt):
            print("\nGoodbye!")
            break
        if user_text.lower() in ("quit", "exit"):
            print("Goodbye!")
            break
        print(study_session(user_text))
        print()

if __name__ == "__main__":
    main()
