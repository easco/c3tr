import Entity from 'Entity';
import Offset from 'data/Offset';

// Data ------------------------------------------------------------------------

const POSITION = 'POSITION';

// Exports ---------------------------------------------------------------------

export default {
  create,
  from,
  match,
  move,
  type: POSITION
};

// Functions -------------------------------------------------------------------

function create(x, y) {
  return {
    type: POSITION,
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

function move(entity, { x, y }) {
  return Entity.update(entity, POSITION, () => ({ x, y }));
}
