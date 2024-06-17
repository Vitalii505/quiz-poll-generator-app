import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import React from 'react';

interface SingleChoiceQuestionProps {
    options: string[];
    onChange: (answer: string) => void;
}

const SingleChoiceQuestion: React.FC<SingleChoiceQuestionProps> = ({ options, onChange }) => {
    return (
        <div>
            <FormControl>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                >
                    {options.map((option, index) => (
                        <div key={index}>
                            <FormControlLabel
                                value={options}
                                control={<Radio
                                    id={option}
                                    value={option}
                                    name="single-choice"
                                    onChange={(e) => onChange(e.target.value)}
                                />}
                                label={option}
                            />
                        </div>
                    ))}
                </RadioGroup>
            </FormControl>
        </div>
    );
};

export default SingleChoiceQuestion;
