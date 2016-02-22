import Entity from 'Entity';
import Offset from 'data/Offset';

// Exports ---------------------------------------------------------------------

export default {
  create,
  from,
  match,
  set
};

// Functions -------------------------------------------------------------------

function create(x, y) {
  return {
    key: 'position',
    value: { x, y }
  };
}

function from(source, direction) {
  const offset = Offset[direction];

  return {
    x: source.x + offset.x,
    y: source.y + offset.y
  };
}

function match(a, b) {
  return a.x === b.x && a.y === b.y;
}

function set(entity, { x, y }) {
  return Entity.update(entity, {
    position: () => ({ x, y })
  });
}
