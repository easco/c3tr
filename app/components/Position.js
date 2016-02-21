import Entity from 'Entity';

// Data ------------------------------------------------------------------------

const POSITION = 'POSITION';

// Exports ---------------------------------------------------------------------

module.exports = {
  create,
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

function match(a, b) {
  return a.x === b.x && a.y === b.y;
}

function move(entity, x, y) {
  return Entity.update(entity, POSITION, value => ({ x, y }));
}
