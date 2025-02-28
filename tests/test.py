from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os
import re
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Secure API Key from .env
API_KEY = os.getenv("GEMINI_API_KEY")

# Difficulty levels mapping
difficulty_levels = ["Basic", "Intermediate", "Advanced"]
current_level = 1  # Start at "Intermediate"
question_data = {}  # Store last generated question

def generate_question(level="Intermediate", topic="Ohm's Law"):
    """Generate an MCQ using AI based on difficulty level."""
    if not API_KEY:
        return {"error": "API Key is missing. Check .env file."}

    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={API_KEY}"
    headers = {"Content-Type": "application/json"}

    prompt = f"""
    You are a physics tutor. Generate a **multiple-choice question (MCQ)** on **{topic}**.

    **Difficulty Level:** {level}

    Format:
    - **Question:** <question>
    - **A)** <option 1>
    - **B)** <option 2>
    - **C)** <option 3>
    - **D)** <option 4>
    - **Correct Answer:** <A/B/C/D>

    Ensure the response follows this structure strictly.
    """

    payload = {"contents": [{"parts": [{"text": prompt}]}]}

    try:
        response = requests.post(url, headers=headers, json=payload)
        response.raise_for_status()
        ai_response = response.json()

        # Extract AI response
        question_text = ai_response.get("candidates", [{}])[0].get("content", {}).get("parts", [{}])[0].get("text", "")

        if not question_text:
            return {"error": "AI response was empty."}

        # Use regex to extract question, options, and answer
        match = re.search(r"\*\*Question:\*\*\s*(.+?)\n", question_text)
        options = re.findall(r"([A-D])\)\s*(.+)", question_text)
        correct_answer_match = re.search(r"\*\*Correct Answer:\*\*\s*([A-D])", question_text)

        if not match or not options or not correct_answer_match:
            return {"error": "Invalid AI response format."}

        question = match.group(1).strip()
        correct_answer = correct_answer_match.group(1).strip()
        options_dict = {opt[0]: opt[1].strip() for opt in options}

        if len(options_dict) != 4 or correct_answer not in options_dict:
            return {"error": "Invalid options or answer key from AI."}

        global question_data
        question_data = {
            "question": question,
            "A": options_dict["A"],
            "B": options_dict["B"],
            "C": options_dict["C"],
            "D": options_dict["D"],
            "answer": correct_answer,
        }
        print("Full AI Response:", ai_response)


        return question_data

    except requests.exceptions.RequestException as e:
        return {"error": f"API Error: {e}"}


@app.route("/generate-question", methods=["GET"])
def get_question():
    """Return an MCQ question based on current difficulty."""
    question = generate_question(level=difficulty_levels[current_level])
    return jsonify(question)


@app.route("/check-answer", methods=["POST"])
def check_answer():
    """Validate user's answer and adjust difficulty accordingly."""
    global current_level

    data = request.json
    selected_answer = data.get("selected_answer")

    if not question_data:
        return jsonify({"error": "No question generated yet!"}), 400

    correct_answer = question_data.get("answer")

    if selected_answer == correct_answer:
        current_level = min(current_level + 1, 2)  # Increase difficulty, max level is Advanced
        return jsonify({"message": "✅ Correct! Next question will be harder.", "new_level": difficulty_levels[current_level]})
    else:
        current_level = max(current_level - 1, 0)  # Decrease difficulty, min level is Basic
        return jsonify({"message": "❌ Incorrect! Next question will be easier.", "new_level": difficulty_levels[current_level]})


if __name__ == "__main__":
    app.run(debug=True)
