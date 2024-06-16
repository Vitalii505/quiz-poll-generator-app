
export function setSystemPrompt(theme: string) {
    const prompt = `
        Generate a quiz on the topic: ${theme}. The quiz should have 8 to 12 questions.
        Each quiz should include:
        - At least one single-choice question with options
        - At least one multiple-choice question with options
        - At least one progress bar question with a scale (e.g., 1 to 10)
        - At least one text response question
        Format the response as a JSON object with the following structure:
        {
            "questions": [
                {
                    "type": "single-choice",
                    "text": "Question text here",
                    "options": ["Option 1", "Option 2", "Option 3"]
                },
                {
                    "type": "multiple-choice",
                    "text": "Question text here",
                    "options": ["Option 1", "Option 2", "Option 3"]
                },
                {
                    "type": "progress-bar",
                    "text": "Question text here",
                    "scale": { "min": 1, "max": 10 }
                },
                {
                    "type": "text",
                    "text": "Question text here"
                }
            ]
        }
    `;
    return prompt;
}