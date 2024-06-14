import React from 'react';

interface TextQuestionProps {
    question: string;
    onChange: (answer: string) => void;
}

const TextQuestion: React.FC<TextQuestionProps> = ({ question, onChange }) => {
    return (
        <div>
        <p>{question}</p>
        <textarea onChange={(e) => onChange(e.target.value)} />
        </div>
    );
};

export default TextQuestion;
