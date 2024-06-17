import { TextField } from '@mui/material';
import React from 'react';

interface TextQuestionProps {
    onChange: (answer: string) => void;
}

const TextQuestion: React.FC<TextQuestionProps> = ({ onChange }) => {
    return (
        <div>
            <TextField
                fullWidth
                id="fullWidth"
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
};

export default TextQuestion;
