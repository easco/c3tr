import Entity from 'Entity';

// Data ------------------------------------------------------------------------

const POSITION = 'POSITION';

// Exports ---------------------------------------------------------------------

module.exports = {
  create,
  match,
  move,
  moveEast,
  moveNorth,
  moveSouth,
  moveWest,
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

function move(entity, { x, y }) {
  return Entity.update(entity, POSITION, () => ({ x, y }));
}

function moveEast(entity) {
  return Entity.update(entity, POSITION, value => ({
    x: value.x + 1,
    y: value.y
  }));
}

function moveNorth(entity) {
  return Entity.update(entity, POSITION, value => ({
    x: value.x,
    y: value.y - 1
  }));
}

function moveSouth(entity) {
  return Entity.update(entity, POSITION, value => ({
    x: value.x,
    y: value.y + 1
  }));
}

function moveWest(entity) {
  return Entity.update(entity, POSITION, value => ({
    x: value.x - 1,
    y: value.y
  }));
}
