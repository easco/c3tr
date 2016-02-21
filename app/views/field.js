import Carl from 'entities/Carl';
import Entity from 'Entity';
import World from 'World';
import { find, html } from 'DOM';

function entitiesVisible(entities, min, max) {
  return entities
    .filter(entity => {
      if (
        !entity.hasOwnProperty('avatar')
        || !entity.hasOwnProperty('position')
      ) return false;

      const pos = entity.position;
      return (
        pos.x >= min.x && pos.x <= max.x && pos.y >= min.y && pos.y <= max.y
      );
    });
}

export default function renderField({ state, world }) {
  const fieldCanvas = find('#Field');
  const fieldContext = fieldCanvas.getContext('2d');

  fieldContext.clearRect(0, 0, fieldCanvas.width, fieldCanvas.height);
  fieldContext.font = '20px monospace';

  const carl = Carl.find(state.entities);
  const carlPos = carl.position;

  const remX = fieldCanvas.width % 20;
  const remY = fieldCanvas.height % 20;
  const offsetX = remX > 0 ? remX - 20 : 0;
  const offsetY = remY > 0 ? remY - 20 : 0;

  const columns = Math.ceil(fieldCanvas.width / 20);
  const rows = Math.ceil(fieldCanvas.height / 20);

  const colSpan = Math.ceil((columns - 1) / 2);
  const rowSpan = Math.ceil((rows - 1) / 2);

  const startPos = { x: carlPos.x - colSpan, y: carlPos.y - rowSpan };
  const endPos = { x: startPos.x + columns - 1, y: startPos.y + rows - 1 };
  const visibleEntities = entitiesVisible(state.entities, startPos, endPos);

  let avatar, i, j, presentEntities, tile, visibleEntity, x, y;
  for (let column = 0; column < columns; column++) {
    for (let row = 0; row < rows; row++) {
      x = carlPos.x + column - colSpan;
      y = carlPos.y + row - rowSpan;
      i = 20 * column + offsetX;
      j = 20 * row + offsetY;

      // TODO: Handle horizontal wrapping of map
      if ( x < 0 || x >= world.width || y < 0 || y >= world.height) {
        continue;
      }

      tile = World.tileAt(world, { x, y });

      fieldContext.fillStyle = tile.backgroundColor;
      fieldContext.fillRect(i, j, 20, 20);

      presentEntities = visibleEntities
        .filter(e => e.position.x === x && e.position.y === y);

      const visibleEntity = presentEntities.length > 0
        ? presentEntities.reduce((imp, e) =>
            e.avatar.importance > imp.avatar.importance ? e : imp
          )
        : null;

      avatar = visibleEntity ? visibleEntity.avatar : tile.avatar;
      fieldContext.fillStyle = avatar.style;
      fieldContext.fillText(avatar.character, i + 4, j + 16);
    }
  }
}
