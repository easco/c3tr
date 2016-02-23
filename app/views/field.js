import Carl from 'entities/Carl';
import DOM from 'DOM';
import Position from 'components/Position';
import Tile from 'Tile';
import World from 'World';

function entitiesVisible(entities, min, max) {
  return entities
    .filter(e => e.avatar && e.position)
    .filter(entity => {
      const { x, y } = entity.position;
      return (
        (x >= min.x || x <= max.x)
        && y >= min.y
        && y <= max.y
      );
    });
}

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

  const startX = carlPos.x - colSpan;
  const startPos = {
    x: startX < 0 ? startX + world.width : startX,
    y: carlPos.y - rowSpan
  };

  const endX = startX + columns;
  const endPos = {
    x: endX > world.width ? endX - world.width : endX,
    y: startPos.y + rows
  };

  const visibleEntities = entitiesVisible(state.entities, startPos, endPos);

  let avatar, i, j, presentEntities, tile, tileValue, x, y;
  for (let column = 0; column <= columns; column++) {
    for (let row = 0; row <= rows; row++) {
      x = carlPos.x + column - colSpan;
      y = carlPos.y + row - rowSpan;
      i = 20 * column + offsetX;
      j = 20 * row + offsetY;

      if (y < 0 || y >= world.height) continue;
      if (x < 0) x += world.width;
      if (x >= world.width) x -= world.width;

      tile = World.tileAt(world, { x, y });
      tileValue = Tile.value(tile);

      fieldContext.fillStyle = tileValue.backgroundColor;
      fieldContext.fillRect(i, j, 20, 20);

      presentEntities = visibleEntities
        .filter(e => Position.match(e.position, { x, y }));

      avatar = presentEntities.length > 0
        ? presentEntities.reduce((top, entity) =>
            entity.avatar.importance > top.avatar.importance ? entity : top
          ).avatar
        : tileValue.avatar;

      fieldContext.fillStyle = avatar.style;
      fieldContext.fillText(avatar.character, i + 4, j + 16);
    }
  }
}
