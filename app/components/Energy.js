import Entity from 'Entity';

// Data ------------------------------------------------------------------------

const ENERGY = 'ENERGY';

// Exports ---------------------------------------------------------------------

module.exports = {
  create,
  drain,
  fill,
  type: ENERGY
};

// Functions -------------------------------------------------------------------

function create(level) {
  return {
    type: ENERGY,
    value: level
  };
}

function drain(entity, amount) {
  return Entity.update(entity, ENERGY, value => value - amount);
}

function fill(entity, amount) {
  return Entity.update(entity, ENERGY, value => value + amount);
}
