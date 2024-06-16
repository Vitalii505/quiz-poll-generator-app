import React from 'react';

interface SingleChoiceQuestionProps {
    options: string[];
    onChange: (answer: string) => void;
}

const SingleChoiceQuestion: React.FC<SingleChoiceQuestionProps> = ({ options, onChange }) => {
    return (
        <div>
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
