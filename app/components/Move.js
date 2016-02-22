import Entity from 'Entity';
import Offset from 'data/Offset';
import Position from 'components/Position';

// Data ------------------------------------------------------------------------

const MOVE = 'move';

// Exports ---------------------------------------------------------------------

export default {
  create,
  perform,
  key: MOVE
};

// Functions -------------------------------------------------------------------

function create(direction) {
  return {
    key: MOVE,
    value: direction
  };
}

function perform(entity) {
  const entityPosition = Entity.get(entity, Position.key);
  const offset = Offset[Entity.get(entity, MOVE)];
  const position = {
    x: entityPosition.x + offset.x,
    y: entityPosition.y + offset.y
  };

  if (position) entity = Position.set(entity, position);

  return Entity.detach(entity, MOVE);
}
