function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

export function generateStyles() {
    const primaryColor = getRandomColor();
    const secondaryColor = getRandomColor();

    return `
        body {
        background-color: ${secondaryColor};
        color: ${primaryColor};
        font-family: Arial, sans-serif;
        }

        p {
        font-size: 1.2em;
        }

        input, textarea, select {
        margin: 10px 0;
        padding: 10px;
        font-size: 1em;
        }

        button {
        background-color: ${primaryColor};
        color: #fff;
        border: none;
        padding: 10px 20px;
        cursor: pointer;
        }

        button:hover {
        background-color: ${secondaryColor};
        color: ${primaryColor};
        }
    `;
}
