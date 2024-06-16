import React from 'react';

interface TextQuestionProps {
    onChange: (answer: string) => void;
}

const TextQuestion: React.FC<TextQuestionProps> = ({ onChange }) => {
    return (
        <div>
            <textarea onChange={(e) => onChange(e.target.value)} />
        </div>
    );
};

export default TextQuestion;
