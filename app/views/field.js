import Entity from 'Entity';
import { find, html } from 'DOM';

export default function renderField(model) {
  const fieldCanvas = find('#Field');
  const fieldContext = fieldCanvas.getContext('2d');

  fieldContext.clearRect(0, 0, fieldCanvas.width, fieldCanvas.height);
  fieldContext.font = '20px monospace';
  fieldContext.fillStyle = '#ccc';

  const maxWidth = fieldCanvas.width / 20;
  const maxHeight = fieldCanvas.height / 20;

  const start = Date.now();
  let tile, x, y;
  for (let i = 0; i < maxWidth; i ++) {
    for (let j = 0; j < maxHeight; j++) {
      x = 20 * i;
      y = 20 * j;

      tile = Entity.properties(model.world[i][j]);

      fieldContext.fillStyle = tile.backgroundColor;
      fieldContext.fillRect(x, y, 20, 20);

      fieldContext.fillStyle = tile.avatar.style;
      fieldContext.fillText(tile.avatar.character, x + 4, y + 16);
    }
  }
  console.log('Rendered in', Date.now() - start, 'ms');
}
