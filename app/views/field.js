import Entity from 'Entity';
import Occupant from 'components/Occupant';
import Position from 'components/Position';
import { find, html } from 'DOM';

export default function renderField(model) {
  const fieldCanvas = find('#Field');
  const fieldContext = fieldCanvas.getContext('2d');

  fieldContext.clearRect(0, 0, fieldCanvas.width, fieldCanvas.height);
  fieldContext.font = '20px monospace';

  const carlPos = Entity.get(model.carl, Position.type);

  const remX = fieldCanvas.width % 20;
  const remY = fieldCanvas.height % 20;
  const offsetX = remX > 0 ? remX - 20 : 0;
  const offsetY = remY > 0 ? remY - 20 : 0;

  const columns = Math.ceil(fieldCanvas.width / 20);
  const rows = Math.ceil(fieldCanvas.height / 20);

  const colSpan = Math.ceil((columns - 1) / 2);
  const rowSpan = Math.ceil((rows - 1) / 2);

  let avatar, i, j, tile, tileProps, x, y;
  for (let column = 0; column < columns; column++) {
    for (let row = 0; row < rows; row++) {
      x = carlPos.x + column - colSpan;
      y = carlPos.y + row - rowSpan;
      i = 20 * column + offsetX;
      j = 20 * row + offsetY;

      // TODO: Handle horizontal wrapping of map
      if ( x < 0 || x >= model.world.width || y < 0 || y >= model.world.height) {
        continue;
      }

      tile = model.world.tiles[x][y];
      tileProps = Entity.properties(tile);

      fieldContext.fillStyle = tileProps.backgroundColor;
      fieldContext.fillRect(i, j, 20, 20);

      avatar = Occupant.isOccupied(tile)
        ? Entity.properties(tileProps.occupant).avatar
        : tileProps.avatar;

      fieldContext.fillStyle = avatar.style;
      fieldContext.fillText(avatar.character, i + 4, j + 16);
    }
  }
}
