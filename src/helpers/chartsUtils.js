// export { generatePalette, getRandomPastelColor };

export function getRandomPastelColor() {
  const r = (Math.round(Math.random() * 127) + 127).toString();
  const g = (Math.round(Math.random() * 127) + 127).toString();
  const b = (Math.round(Math.random() * 127) + 127).toString();
  return `rgb(${r}, ${g}, ${b})`;
}

export function generatePalette(length) {
  const colors = [];
  for (let i = 0; i < length; i++) {
    colors.push(getRandomPastelColor());
  }
  return colors;
}
