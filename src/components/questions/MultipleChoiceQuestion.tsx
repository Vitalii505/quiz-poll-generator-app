import React, { useState } from 'react';

interface MultipleChoiceQuestionProps {
    options: string[];
    onChange: (answers: string[]) => void;
}

const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({ options, onChange }) => {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    const handleChange = (option: string) => {
        const newSelectedOptions = selectedOptions.includes(option)
        ? selectedOptions.filter(opt => opt !== option)
        : [...selectedOptions, option];

        setSelectedOptions(newSelectedOptions);
        onChange(newSelectedOptions);
    };

    return (
        <div>
            {options.map((option, index) => (
                <div key={index}>
                <input
                    type="checkbox"
                    id={option}
                    name="multiple-choice"
                    value={option}
                    onChange={() => handleChange(option)}
                />
                <label htmlFor={option}>{option}</label>
                </div>
            ))}
        </div>
    );
};

export default MultipleChoiceQuestion;
