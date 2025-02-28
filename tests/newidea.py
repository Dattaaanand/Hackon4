import requests

# Replace with your actual API key
API_KEY = "AIzaSyAE1SECKjNzkW3xXTZKcQooFv5G2nFhjuU"

# Define difficulty levels
difficulty_levels = ["Basic", "Intermediate", "Advanced"]

# Track current difficulty level
current_level = 0  # Start with "Basic"

def generate_question(level):
    """ Generate a multiple-choice question using Google Gemini AI based on difficulty level. """
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={API_KEY}"
    
    headers = {"Content-Type": "application/json"}

    prompt = f"""
    You are a physics tutor creating adaptive multiple-choice questions for a Class 11 physics lab.
    The student should be tested on measuring instruments like Vernier calipers, screw gauge, and titration.

    **Difficulty Level:** {difficulty_levels[level]}
    
    Generate a **single multiple-choice question (MCQ)** about a physics lab concept.  
    Follow this format:
    
    **Question:** <question text>  
    **A)** <option 1>  
    **B)** <option 2>  
    **C)** <option 3>  
    **D)** <option 4>  
    
    """

    payload = {"contents": [{"parts": [{"text": prompt}]}]}

    response = requests.post(url, headers=headers, json=payload)

    if response.status_code == 200:
        ai_response = response.json()
        question_text = ai_response['candidates'][0]['content']['parts'][0]['text']
        return question_text
    else:
        return "Error generating question."

def evaluate_answer(user_answer, correct_answer):
    """ Check if the answer is correct and adjust difficulty. """
    global current_level

    if user_answer.strip().upper() == correct_answer.strip().upper():
        print("✅ Correct!")
        if current_level < len(difficulty_levels) - 1:  # Increase difficulty if possible
            current_level += 1
    else:
        print("❌ Incorrect.")
        if current_level > 0:  # Lower difficulty if possible
            current_level -= 1

# Main loop to ask 10 questions
for i in range(10):
    print(f"\n🔹 **Question {i+1} ({difficulty_levels[current_level]})** 🔹")
    
    question_data = generate_question(current_level)
    print(question_data)

    # Extract correct answer from AI response
    if "**Correct Answer:**" in question_data:
        question_part, correct_answer = question_data.split("**Correct Answer:**")
        correct_answer = correct_answer.strip()
    else:
        correct_answer = "A"  # Default fallback

    user_answer = input("Your answer (A/B/C/D): ")
    evaluate_answer(user_answer, correct_answer)
