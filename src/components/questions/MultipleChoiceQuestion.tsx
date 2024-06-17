import { Checkbox, FormControl, FormControlLabel, FormGroup } from '@mui/material';
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
            <FormControl>
                <FormGroup>
                    {options.map((option, index) => (
                        <div key={index}>
                            <FormControlLabel required control={<Checkbox
                                id={option}
                                name="multiple-choice"
                                value={option}
                                onChange={() => handleChange(option)}
                            />}
                                label={option}
                            />
                        </div>
                    ))}
                </FormGroup>
            </FormControl>
        </div>
    );
};

export default MultipleChoiceQuestion;
