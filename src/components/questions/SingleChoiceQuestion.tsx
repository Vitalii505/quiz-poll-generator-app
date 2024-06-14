import React from 'react';

interface SingleChoiceQuestionProps {
    question: string;
    options: string[];
    onChange: (answer: string) => void;
}

const SingleChoiceQuestion: React.FC<SingleChoiceQuestionProps> = ({ question, options, onChange }) => {
    return (
        <div>
        <p>{question}</p>
        {options.map((option, index) => (
            <div key={index}>
            <input
                type="radio"
                id={option}
                name="single-choice"
                value={option}
                onChange={(e) => onChange(e.target.value)}
            />
            <label htmlFor={option}>{option}</label>
            </div>
        ))}
        </div>
    );
};

export default SingleChoiceQuestion;
