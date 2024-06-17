import OpenAI from "openai";
import { setSystemPrompt } from "../prompts";


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
        return { questions: [] };
    }
};

export async function generateQuestions({ theme, apiKey, numQuestions }: GenerateQuestionsParams) {
    const openai = new OpenAI({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true
    });
    const prompt = setSystemPrompt(theme);
    const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [{ role: "system", content: prompt }],
        max_tokens: 1500,
        response_format: {
            type: "json_object",
        },
    });
    const _generatedQuestions = response.choices[0].message.content;
    const survey = parseSurveyResponse(_generatedQuestions as any);
    return survey;
}