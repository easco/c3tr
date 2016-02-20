import { find, html } from 'DOM';

export default function renderField(model) {
  const fieldCanvas = find('#Field');
  const fieldContext = fieldCanvas.getContext('2d');

  fieldContext.clearRect(0, 0, fieldCanvas.width, fieldCanvas.height);
  fieldContext.font = '20px monospace';
  fieldContext.fillStyle = '#ccc';

  for (let x = 0; x < fieldCanvas.width / 20; x ++) {
    for (let y = 0; y < fieldCanvas.height / 20; y++) {
      const character = model.world[x][y] > 0.5 ? 'X' : '.';
      fieldContext.fillText(character, x * 20, 16 + y * 20);
    }
  }
}
