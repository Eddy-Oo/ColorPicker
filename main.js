const colorPicker = document.getElementById('colorPicker');
const colorBox = document.getElementById('colorBox');
const hexValue = document.getElementById('hexValue');
const rgbValue = document.getElementById('rgbValue');
const hslValue = document.getElementById('hslValue');
const cssName = document.getElementById('cssName');

function hexToRgb(hex) {
  let bigint = parseInt(hex.slice(1), 16);
  let r = (bigint >> 16) & 255;
  let g = (bigint >> 8) & 255;
  let b = bigint & 255;
  return `rgb(${r}, ${g}, ${b})`;
}

function rgbToHsl(r, g, b) {
  r /= 255, g /= 255, b /= 255;
  let max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  if (max == min) {
    h = s = 0;
  } else {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
}

function updateColorValues() {
  const hex = colorPicker.value;
  const rgb = hexToRgb(hex);
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const hsl = rgbToHsl(r, g, b);

  colorBox.style.backgroundColor = hex;
  hexValue.value = hex;
  rgbValue.value = rgb;
  hslValue.value = hsl;

  const colorNames = getComputedStyle(document.body).getPropertyValue('--color-names');
  cssName.value = getColorName(hex);
}

function copyToClipboard(elementId) {
  const copyText = document.getElementById(elementId);
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  document.execCommand("copy");
}

function getColorName(hex) {
  const names = {
    "#ff5733": "Red Orange",
    "#ff0000": "Red",
    "#00ff00": "Lime",
    "#0000ff": "Blue",
    "#ffff00": "Yellow",
    "#00ffff": "Cyan",
    "#ff00ff": "Magenta",
    // Add more custom color mappings here
  };
  return names[hex] || "Unknown";
}

colorPicker.addEventListener('input', updateColorValues);

updateColorValues(); // Initialize with default color
