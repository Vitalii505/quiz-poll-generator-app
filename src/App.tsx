import React, { useState, useEffect } from 'react';
import './index.css';
import { generateQuestions } from './api/ChatGPTService';
import SingleChoiceQuestion from './components/questions/SingleChoiceQuestion';
import MultipleChoiceQuestion from './components/questions/MultipleChoiceQuestion';
import SliderQuestion from './components/questions/SliderQuestion';
import TextQuestion from './components/questions/TextQuestion';
import { generateStyles } from './utils/styleGenerator';
import { Typography, Box, TextField, Button, Backdrop, CircularProgress, Stepper, Paper, Step, StepLabel, StepContent } from '@mui/material';

const App: React.FC = () => {
    const [theme, setTheme] = useState('');
    const [apiKey, setApiKey] = useState('');
    const [questions, setQuestions] = useState<any[]>([]);
    const [answers, setAnswers] = useState<any>({});
    const [styles, setStyles] = useState('');
    const [error, setError] = useState('');
    const [isGenerateStatus, setIsGenerateStatus] = React.useState(false);
    const [isSetQuestionsParam, setIsSetQuestionsParam] = React.useState(false);
    const [activeStep, setActiveStep] = React.useState(0);

    const handleSetQuestionsParam = () => {
        setIsSetQuestionsParam(false);
    };
    
    const handleGenerateQuestions = async () => {
        if (theme?.length <= 0) setError('theme');
        if (apiKey?.length <= 0) setError('apiKey');
        if (theme?.length <= 0 || apiKey?.length <= 0) return;
        setIsSetQuestionsParam(true);
        setIsGenerateStatus(true);
        try {
            const generatedQuestions = await generateQuestions({ theme, apiKey, numQuestions: 10 });
            const _generatedQuestions = generatedQuestions?.questions;
            setQuestions(_generatedQuestions as []);
            setStyles(generateStyles());
            setIsGenerateStatus(false);
        } catch (e) {
            setIsGenerateStatus(false);
            alert('Error OpenAI API request: ' + e);
        }
    };

    const handleAnswerChange = (questionIndex: number, answer: any) => {
        setAnswers({
            ...answers,
            [questionIndex]: answer
        });
    };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleEndQuestion = () => {
        handleNext();
        alert(`Results: ${JSON.stringify(answers, null, 2)}`);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    useEffect(() => {
        const styleSheet = document.createElement("style");
        styleSheet.type = "text/css";
        styleSheet.innerText = styles;
        document.head.appendChild(styleSheet);
    }, [styles]);

    return (
        <div className='survey-content-container'>
        <div className='survey-content-box'>
            
            {!isSetQuestionsParam ? <Box>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        '& > :not(style)': { m: 2 },
                    }}
                    >
                    <TextField
                        id="demo-helper-text-misaligned"
                        error={error === 'theme' ? true : false}
                        label="Theme"
                        value={theme}
                        onChange={(e) => setTheme(e.target.value)}
                    />
                    <TextField
                        id="demo-helper-text-misaligned-no-helper"
                        error={error === 'apiKey' ? true : false}
                        label="OpenAI API Key"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                    />
                </Box>
                
            </Box> : null}
            {!isSetQuestionsParam ? <Button
                variant="contained"
                disableElevation
                onClick={handleGenerateQuestions}
            >
                Generate Questions
            </Button> : null}
            {isSetQuestionsParam ? <Button
                variant="outlined"
                disableElevation
                onClick={handleSetQuestionsParam}
            >
                New Quiz
            </Button> : null}
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isGenerateStatus}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Box
                sx={{maxWidth: 800}}
            >
                <Stepper activeStep={activeStep} orientation="vertical">   
                    {(questions || []).map((question, index) => {
                    switch (question?.type) {
                        case 'single-choice':
                            return <Step key={index}>
                                <StepLabel
                                >
                                    {question.text}
                                </StepLabel>
                                <StepContent>
                                    <SingleChoiceQuestion
                                        key={index}
                                        options={question.options}
                                        onChange={(answer) => handleAnswerChange(index, answer)}
                                    />
                                    <Box sx={{ mb: 2 }}>
                                        <div>
                                            <Button
                                                variant="contained"
                                                onClick={index === questions.length - 1 ? handleEndQuestion : handleNext}
                                                sx={{ mt: 1, mr: 1 }}
                                            >
                                                {index === questions?.length - 1 ? 'Finish' : 'Continue'}
                                            </Button>
                                            <Button
                                                disabled={index === 0}
                                                onClick={handleBack}
                                                sx={{ mt: 1, mr: 1 }}
                                            >
                                                Back
                                            </Button>
                                        </div>
                                    </Box>
                                </StepContent>
                            </Step>
                        case 'multiple-choice':
                            return <Step key={index}>
                                <StepLabel
                                >
                                    {question.text}
                                </StepLabel>
                                <StepContent>
                                    <MultipleChoiceQuestion
                                        key={index}
                                        options={question.options}
                                        onChange={(answers) => handleAnswerChange(index, answers)}
                                    />
                                    <Box sx={{ mb: 2 }}>
                                        <div>
                                            <Button
                                                variant="contained"
                                                onClick={index === questions.length - 1 ? handleEndQuestion : handleNext}
                                                sx={{ mt: 1, mr: 1 }}
                                            >
                                                {index === questions.length - 1 ? 'Finish' : 'Continue'}
                                            </Button>
                                            <Button
                                                disabled={index === 0}
                                                onClick={handleBack}
                                                sx={{ mt: 1, mr: 1 }}
                                            >
                                                Back
                                            </Button>
                                        </div>
                                    </Box>
                                </StepContent>
                            </Step>
                        case 'progress-bar':
                            return <Step key={index}>
                                <StepLabel
                                >
                                    {question.text}
                                </StepLabel>
                                <StepContent>
                                    <SliderQuestion
                                        key={index}
                                        min={question.min}
                                        max={question.max}
                                        onChange={(value) => handleAnswerChange(index, value)}
                                    />
                                    <Box sx={{ mb: 2 }}>
                                        <div>
                                            <Button
                                                variant="contained"
                                                onClick={index === questions.length - 1 ? handleEndQuestion : handleNext}
                                                sx={{ mt: 1, mr: 1 }}
                                            >
                                                {index === questions.length - 1 ? 'Finish' : 'Continue'}
                                            </Button>
                                            <Button
                                                disabled={index === 0}
                                                onClick={handleBack}
                                                sx={{ mt: 1, mr: 1 }}
                                            >
                                                Back
                                            </Button>
                                        </div>
                                    </Box>
                                </StepContent>
                            </Step>
                        case 'text':
                            return <Step key={index}>
                                <StepLabel
                                >
                                    {question.text}
                                </StepLabel>
                                <StepContent>
                                    <TextQuestion
                                        key={index}
                                        onChange={(answer) => handleAnswerChange(index, answer)}
                                    />
                                    <Box sx={{ mb: 2 }}>
                                        <div>
                                            <Button
                                                variant="contained"
                                                onClick={index === questions.length - 1 ? handleEndQuestion : handleNext}
                                                sx={{ mt: 1, mr: 1 }}
                                            >
                                                {index === questions.length - 1 ? 'Finish' : 'Continue'}
                                            </Button>
                                            <Button
                                                disabled={index === 0}
                                                onClick={handleBack}
                                                sx={{ mt: 1, mr: 1 }}
                                            >
                                                Back
                                            </Button>
                                        </div>
                                    </Box>
                                </StepContent>
                            </Step>
                        default:
                            return null;
                    }
                    })}        
                </Stepper>
                {((activeStep === questions?.length) && (isSetQuestionsParam)) && (
                    <Paper square elevation={0} sx={{ p: 3 }} className='survey-result-box'>
                        <Typography>All steps completed - you&apos;re finished</Typography>
                        <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                            Reset
                        </Button>
                    </Paper>
                )}
            </Box>
        </div>
        </div>
    );
};

export default App;
