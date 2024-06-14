import OpenAI from "openai";


interface GenerateQuestionsParams {
    theme: string;
    apiKey: string;
    numQuestions: number;
}

interface Question {
    type: string;
    text: string;
    options?: string[];
    scale?: {
        min: number;
        max: number;
    };
}

interface Survey {
    questions: Question[];
}

const parseSurveyResponse = (response: string): Survey => {
    try {
        const parsedResponse = JSON.parse(response);
        return parsedResponse as Survey;
    } catch (error) {
        console.error('>>>>> 2.0 <<<< Error parsing JSON: ', error);
        return { questions: [] };
    }
};

export async function generateQuestions({ theme, apiKey, numQuestions }: GenerateQuestionsParams) {
    // const prompt = `Generate ${numQuestions} questions on the topic "${theme}". Each question should be of a different type from the following: single choice, multiple choice, slider, text response.`;
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

    try {
        const openai = new OpenAI({
            apiKey: apiKey,
            dangerouslyAllowBrowser: true
        });

        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [{ role: "system", content: prompt }],
            max_tokens: 1500,
            response_format: {
                type: "json_object",
            },
            // n: 1,
            // stop: null,
            // temperature: 0.7,
        });
        const _generatedQuestions = response.choices[0].message.content;
        console.log("******* _1_ _generatedQuestions ****** ");
        console.log("******* _1.1_  typeof _generatedQuestions ****** ", typeof _generatedQuestions);   
        const survey = parseSurveyResponse(_generatedQuestions as any);
        console.log(survey);
        return survey;
    } catch (error) {
        console.log("!!! _2_  ERROR  ****** ");
        console.log(error);
    }
}
