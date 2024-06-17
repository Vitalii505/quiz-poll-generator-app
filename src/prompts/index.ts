
export function setSystemPrompt(theme: string) {
    const prompt = `
        Generate a quiz on the topic: ${theme}. The quiz should have 8 to 12 questions.
        Each quiz should include:
        - At least one single-choice question with options
        - At least one multiple-choice question with options
        - At least one progress bar question with a scale (e.g., 1 to 100)
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
                    "scale": { "min": 1, "max": 100 }
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

export function setUserPrompt(theme: string, results: string) {
    const prompt = `
        Next, compare the quiz you created on the topic: ${theme} and evaluate the results of the answers to each question.
        ${results}
        Give a high-quality, accurate and concise assessment of the results of the quiz on the topic: ${theme}. 
        In the response, return only the assessment of the quiz results in text format!
    `;
    return prompt;
}