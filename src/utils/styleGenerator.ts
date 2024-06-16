function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function hexToRGBA(hex: string, alpha: number) {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function generateStyles() {
    const primaryColor = getRandomColor();
    const secondaryColor = getRandomColor();

    const primaryColorRGBA = hexToRGBA(primaryColor, 1);
    const secondaryColorRGBA = hexToRGBA(secondaryColor, 0.8); 
    const backgroundColor = hexToRGBA("#FFFFFF", 0.2); 

    return `
        body {
            background: linear-gradient(135deg, ${primaryColorRGBA} 0%, ${secondaryColorRGBA} 100%);
            font-family: Arial, sans-serif;
            padding: 20px;
            margin: 0;
            min-height: 100vh;
        }

        p {
            font-size: 1.2em;
        }

        input, textarea, select {
            margin: 10px 0;
            padding: 10px;
            font-size: 1em;
            border: 1px solid ${primaryColorRGBA};
            background-color: ${backgroundColor};
        }

        button {
            background-color: ${primaryColorRGBA};
            color: #fff;
            border: none;
            padding: 10px 20px;
            cursor: pointer;
            transition: background-color 0.3s ease, ease;
        }

        button:hover {
            background-color: ${secondaryColorRGBA};
        }

        @media (max-width: 600px) {
            body {
                padding: 10px;
            }

            input, textarea, select {
                font-size: 0.9em;
            }

            button {
                padding: 8px 16px;
                font-size: 0.9em;
            }
        }
    `;
}
