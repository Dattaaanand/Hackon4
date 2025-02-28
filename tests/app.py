import fitz  # PyMuPDF for PDF text extraction
import requests
import json

# Your API Key
API_KEY = "AIzaSyAE1SECKjNzkW3xXTZKcQooFv5G2nFhjuU"

# Function to extract text from PDF
def extract_text_from_pdf(pdf_path):
    text = ""
    with fitz.open(pdf_path) as doc:
        for page in doc:
            text += page.get_text("text") + "\n"
    return text.strip()

# Function to compare extracted procedure with the blueprint
def compare_procedure(extracted_text):
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={API_KEY}"
    
    headers = {"Content-Type": "application/json"}

    blueprint = """
    Aim:
    To determine the concentration of the given hydrochloric acid (HCl) solution by titrating it against a
    standard sodium carbonate (Na2CO3) solution.

    Apparatus and Chemicals Required:
    Apparatus:
    • Burette
    • Pipette (10 mL)
    • Conical flask
    • Beaker
    • Funnel
    • Stand with clamp
    • White tile (optional)

    Chemicals:
    • Sodium carbonate (Na2CO3) solution
    • Hydrochloric acid (HCl) solution
    • Methyl orange indicator
    • Distilled water

    Procedure:
    1. Preparation of Sodium Carbonate Solution:
    o Weigh a known mass of anhydrous sodium carbonate (Na2CO3) and dissolve it in distilled water.
    o Transfer the solution to a volumetric flask and make up the volume to a known mark.

    2. Filling the Burette:
    o Rinse the burette with distilled water and then with hydrochloric acid.
    o Fill the burette with hydrochloric acid and record the initial reading.

    3. Pipetting the Sodium Carbonate Solution:
    o Rinse the pipette with distilled water and then with sodium carbonate solution.
    o Use a pipette to transfer 10 mL of sodium carbonate solution into a conical flask.
    o Add 2-3 drops of methyl orange indicator (solution turns yellow).

    4. Performing the Titration:
    o Slowly add hydrochloric acid from the burette to the conical flask while swirling it continuously.
    o Near the endpoint, add acid dropwise until the color changes from yellow to orange-pink.
    o Record the final burette reading.

    5. Repeating the Experiment:
    o Perform at least three titrations and take the average volume of hydrochloric acid used.

    Result:
    The concentration of the given hydrochloric acid solution is determined using the titration data.

    Balanced Chemical Equation:
    Na2CO3 + 2HCl → 2NaCl + CO2 + H2O
    """

    payload = {
        "contents": [{
            "parts": [{
                "text": f"""
Compare the following procedure with the original blueprint and rate its accuracy out of 10. Follow these strict deduction rules:

- **Chemical Equation**: Deduct **only 1 mark** if the equation does not match exactly.
- **Apparatus**: Deduct **only 1 mark** if at least 2 apparatus are missing. Do not deduct more than 1 mark for apparatus.
- **Aim**: Deduct **only 1 mark** if the aim does not match exactly.
- **Procedure Accuracy**: If the steps are mostly correct, do not deduct any marks.

**Original Blueprint:**
{blueprint}

**Extracted Procedure from PDF:**
{extracted_text}

Provide a **final numerical score out of 10**, along with a breakdown of the deductions.
"""

            }]
        }]
    }

    response = requests.post(url, headers=headers, json=payload)

    if response.status_code == 200:
        result = response.json()
        return result.get("candidates", [{}])[0].get("content", {}).get("parts", [{}])[0].get("text", "Error: No response")
    else:
        return f"Error: {response.status_code}, {response.text}"

# PDF file path (replace with your actual PDF file)
pdf_path = "sample1.pdf"

# Extract text from PDF
extracted_text = extract_text_from_pdf(pdf_path)

# Compare with the blueprint and get a score
score = compare_procedure(extracted_text)

# Print result
print("Accuracy Score:", score)
