import React, { useState } from 'react';

interface SliderQuestionProps {
    min: number;
    max: number;
    onChange: (value: number) => void;
}

const SliderQuestion: React.FC<SliderQuestionProps> = ({ min, max, onChange }) => {
    const [value, setValue] = useState((min + max) / 2);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(event.target.value);
        setValue(newValue);
        onChange(newValue);
    };

    return (
        <div>
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
