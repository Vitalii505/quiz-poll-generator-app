import OpenAI from "openai";
import { setSystemPrompt, setUserPrompt } from "../prompts";


interface GenerateQuestionsParams {
    theme: string;
    apiKey: string;
}

interface GenerateAnswersParams {
    theme: string;
    apiKey: string;
    answers: string;
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

export async function generateQuestions({ theme, apiKey }: GenerateQuestionsParams) {
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
export async function generateEvaluationOfResults({ theme, apiKey, answers }: GenerateAnswersParams) { 
    const openai = new OpenAI({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true
    });
    const systemPrompt = setSystemPrompt(theme);
    const userPrompt = setUserPrompt(theme, answers);
    const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
            {
                role: "system",
                content: systemPrompt
            },
            {
                role: "user",
                content: userPrompt
            }
        ],
        max_tokens: 1500
    });
    const generatedResult = response.choices[0].message.content;
    return generatedResult;
}
