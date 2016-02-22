import Entity from 'Entity';
import Offset from 'data/Offset';
import Position from 'components/Position';

// Data ------------------------------------------------------------------------

const MOVE = 'MOVE';

// Exports ---------------------------------------------------------------------

export default {
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
