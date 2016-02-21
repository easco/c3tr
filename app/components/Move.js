import Entity from 'Entity';
import Position from 'components/Position';

// Data ------------------------------------------------------------------------

const MOVE = 'MOVE';

const Direction = Object.freeze({
  EAST: 'EAST',
  NORTH: 'NORTH',
  SOUTH: 'SOUTH',
  WEST: 'WEST'
});

// Exports ---------------------------------------------------------------------

module.exports = {
  Direction,
  create,
  perform,
  type: MOVE
};

// Functions -------------------------------------------------------------------

function create(direction) {
  return {
    type: MOVE,
    value: direction
  };
}

function perform(entity) {
  let position;
  switch (entity.move) {
    case Direction.EAST:
      position = { x: entity.position.x + 1, y: entity.position.y };
      break;

    case Direction.NORTH:
      position = { x: entity.position.x, y: entity.position.y - 1 };
      break;

    case Direction.SOUTH:
      position = { x: entity.position.x, y: entity.position.y + 1 };
      break;

    case Direction.WEST:
      position = { x: entity.position.x - 1, y: entity.position.y };
      break;
  }

  if (position) entity = Position.move(entity, position);

  return Entity.detach(entity, MOVE);
}
