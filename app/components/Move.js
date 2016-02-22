import Entity from 'Entity';
import Offset from 'data/Offset';
import Position from 'components/Position';

// Exports ---------------------------------------------------------------------

export default {
  create,
  perform
};

// Functions -------------------------------------------------------------------

function create(direction) {
  return {
    key: 'move',
    value: direction
  };
}

function perform(entity) {
  const offset = Offset[entity.move];
  const position = {
    x: entity.position.x + offset.x,
    y: entity.position.y + offset.y
  };

  if (position) entity = Position.set(entity, position);

  return Entity.detach(entity, 'move');
}
