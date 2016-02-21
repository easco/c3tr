import Entity from 'Entity';
import Position from 'components/Position';

// Data ------------------------------------------------------------------------

const MOVE = 'MOVE';

const Direction = Object.freeze({
  EAST: 'EAST',
  NORTH: 'NORTH',
  NORTHEAST: 'NORTHEAST',
  NORTHWEST: 'NORTHWEST',
  SOUTH: 'SOUTH',
  SOUTHEAST: 'SOUTHEAST',
  SOUTHWEST: 'SOUTHWEST',
  WEST: 'WEST'
});

const Offset = Object.freeze({
  EAST: { x: +1, y: 0 },
  NORTH: { x: 0, y: -1 },
  NORTHEAST: { x: +1, y: -1 },
  NORTHWEST: { x: -1, y: -1 },
  SOUTH: { x: 0, y: +1 },
  SOUTHEAST: { x: +1, y: +1 },
  SOUTHWEST: { x: -1, y: +1 },
  WEST: { x: -1, y: 0 }
});

// Exports ---------------------------------------------------------------------

module.exports = {
  Direction,
  Offset,
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
  const offset = Offset[entity.move];
  const position = {
    x: entity.position.x + offset.x,
    y: entity.position.y + offset.y
  };

  if (position) entity = Position.move(entity, position);

  return Entity.detach(entity, MOVE);
}
