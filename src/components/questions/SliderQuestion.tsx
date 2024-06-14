import React, { useState } from 'react';

interface SliderQuestionProps {
    question: string;
    min: number;
    max: number;
    onChange: (value: number) => void;
}

const SliderQuestion: React.FC<SliderQuestionProps> = ({ question, min, max, onChange }) => {
    const [value, setValue] = useState((min + max) / 2);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(event.target.value);
        setValue(newValue);
        onChange(newValue);
    };

    return (
        <div>
        <p>{question}</p>
        <input
            type="range"
            min={min}
            max={max}
            value={value}
            onChange={handleChange}
        />
        <span>{value}</span>
        </div>
    );
};

export default SliderQuestion;
