import React, { useState, useEffect } from 'react';
import { generateQuestions } from './api/ChatGPTService';
import SingleChoiceQuestion from './components/questions/SingleChoiceQuestion';
import MultipleChoiceQuestion from './components/questions/MultipleChoiceQuestion';
import SliderQuestion from './components/questions/SliderQuestion';
import TextQuestion from './components/questions/TextQuestion';
import { generateStyles } from './utils/styleGenerator';

const App: React.FC = () => {
    const [theme, setTheme] = useState('');
    const [apiKey, setApiKey] = useState('');
    const [questions, setQuestions] = useState<any[]>([]);
    const [answers, setAnswers] = useState<any>({});
    const [styles, setStyles] = useState('');

    const handleGenerateQuestions = async () => {
        const generatedQuestions = await generateQuestions({ theme, apiKey, numQuestions: 10 });
        console.log("<----- generatedQuestions -----> ", generatedQuestions);
        const _generatedQuestions = generatedQuestions?.questions;
        setQuestions(_generatedQuestions as any);
        // setQuestions(generatedQuestions); // Assuming the API returns JSON formatted questions
        setStyles(generateStyles());
    };

    const handleAnswerChange = (questionIndex: number, answer: any) => {
        setAnswers({
        ...answers,
        [questionIndex]: answer
        });
    };

    const handleSubmit = () => {
        console.log('Results:', answers);
        alert(`Results: ${JSON.stringify(answers, null, 2)}`);
    };

    useEffect(() => {
        const styleSheet = document.createElement("style");
        styleSheet.type = "text/css";
        styleSheet.innerText = styles;
        document.head.appendChild(styleSheet);
    }, [styles]);

    return (
        <div>
        <h1>Survey Generator</h1>
        <div>
            <label>Theme:</label>
            <input type="text" value={theme} onChange={(e) => setTheme(e.target.value)} />
        </div>
        <div>
            <label>API Key:</label>
            <input type="text" value={apiKey} onChange={(e) => setApiKey(e.target.value)} />
        </div>
        <button onClick={handleGenerateQuestions}>Generate Questions</button>
        {questions.map((question, index) => {
            switch (question.type) {
            case 'single-choice':
                return <SingleChoiceQuestion key={index} question={question.text} options={question.options} onChange={(answer) => handleAnswerChange(index, answer)} />;
            case 'multiple-choice':
                return <MultipleChoiceQuestion key={index} question={question.text} options={question.options} onChange={(answers) => handleAnswerChange(index, answers)} />;
            case 'progress-bar':
                return <SliderQuestion key={index} question={question.text} min={question.min} max={question.max} onChange={(value) => handleAnswerChange(index, value)} />;
            case 'text':
                return <TextQuestion key={index} question={question.text} onChange={(answer) => handleAnswerChange(index, answer)} />;
            default:
                return null;
            }
        })}
        <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default App;
