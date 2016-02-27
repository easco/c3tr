import Carl from 'entities/Carl';
import DOM from 'DOM';
import Position from 'components/Position';
import Tile from 'Tile';
import Util from 'Util';

export default function renderField({ state, world }) {
  const fieldCanvas = DOM.find('#Field');
  const fieldContext = fieldCanvas.getContext('2d');

  fieldContext.clearRect(0, 0, fieldCanvas.width, fieldCanvas.height);
  fieldContext.font = '20px monospace';

  const carl = Carl.findIn(state.entities);
  const carlPos = carl.position;

  const remX = fieldCanvas.width % 20;
  const remY = fieldCanvas.height % 20;
  const offsetX = remX > 0 ? remX - 20 : 0;
  const offsetY = remY > 0 ? remY - 20 : 0;

  const columns = Math.floor(fieldCanvas.width / 20);
  const rows = Math.floor(fieldCanvas.height / 20);

  const colSpan = Math.ceil(columns / 2);
  const rowSpan = Math.ceil(rows / 2);

  const minY = carlPos.y - rowSpan;
  const maxY = carlPos.y + rowSpan;

  let filterPos, minX;
  if (carlPos.x + colSpan > world.width || carlPos.x < colSpan) {
    minX = Util.constrain(carlPos.x - colSpan, 0, world.width);
    const maxX = Util.constrain(carlPos.x + colSpan, 0, world.width);
    filterPos = a => (
      (
        a.position.x >= minX && a.position.x <= world.width
        && a.position.y >= minY && a.position.y <= maxY
      )
      || (
        a.position.x >= 0 && a.position.x <= maxX
        && a.position.y >= minY && a.position.y <= maxY
      )
    );
  }
  else {
    minX = Math.max(carlPos.x - colSpan, 0);
    const maxX = Math.min(carlPos.x + colSpan, world.width);
    filterPos = a => (
      a.position.x >= minX && a.position.x <= maxX
      && a.position.y >= minY && a.position.y <= maxY
    );
  }

  const visibleEntities = state.entities
    .filter(e => e.avatar && e.position)
    .filter(filterPos);

  const visibleTiles = world.tiles
    .filter(filterPos);

  let avatar, i, j, presentEntities, tileValue;
  visibleTiles.forEach(tile => {
    i = 20 * Util.constrain(tile.position.x - minX, 0, world.width) + offsetX;
    j = 20 * Util.constrain(tile.position.y - minY, 0, world.height) + offsetY;

    tileValue = Tile.value(tile);

    fieldContext.fillStyle = tileValue.backgroundColor;
    fieldContext.fillRect(i, j, 20, 20);

    presentEntities = visibleEntities
      .filter(e => Position.match(e.position, tile.position));

    avatar = presentEntities.length > 0
      ? presentEntities.reduce((top, entity) =>
          entity.avatar.importance > top.avatar.importance ? entity : top
        ).avatar
      : tileValue.avatar;

    fieldContext.fillStyle = avatar.style;
    fieldContext.fillText(avatar.character, i + 4, j + 16);
  });
}
