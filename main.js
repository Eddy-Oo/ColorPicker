document.addEventListener('DOMContentLoaded', () => {
    const colorInput = document.getElementById('colorInput');
    const colorDisplay = document.getElementById('colorDisplay');
    const hexValue = document.getElementById('hexValue');
    const rgbValue = document.getElementById('rgbValue');
    const hslValue = document.getElementById('hslValue');
    const copyButtons = document.querySelectorAll('.copy-button');
    const msgDiv = document.querySelector('.alert-msg');

    const updateDisplays = (color) => {
        colorDisplay.style.backgroundColor = color;
        hexValue.textContent = color;

        // Convert Hex to RGB
        const bigint = parseInt(color.slice(1), 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        rgbValue.textContent = `rgb(${r}, ${g}, ${b})`;

        // Convert RGB to HSL
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0; // Achromatic
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
        h = Math.round(h * 360);
        s = Math.round(s * 100);
        l = Math.round(l * 100);
        hslValue.textContent = `hsl(${h}, ${s}%, ${l}%)`;
    };

    colorInput.addEventListener('input', () => {
        updateDisplays(colorInput.value);
    });

    copyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const valueToCopy = {
                'hex': hexValue.textContent,
                'rgb': rgbValue.textContent,
                'hsl': hslValue.textContent
            }[button.dataset.format];

            navigator.clipboard.writeText(valueToCopy).then(() => {
                msgDiv.style.display = 'block';
                setTimeout(() => msgDiv.style.display = 'none', 1000);
            });
        });
    });

    // Initial display update
    updateDisplays(colorInput.value);
});
