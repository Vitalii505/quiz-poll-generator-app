export function generateDynamicStyles(): string {
    const colors = ['#ff9999', '#66b3ff', '#99ff99', '#ffcc99'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    // return {
    //     quizContainer: {
    //         backgroundColor: randomColor,
    //         padding: '20px',
    //         borderRadius: '10px',
    //         textAlign: 'center',
    //     }
    // };
    return `background: ${randomColor}; padding: 20px; border-radius: 10px; text-align: center;`
};
