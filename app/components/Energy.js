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

function create(max) {
  return {
    type: ENERGY,
    value: {
      current: max,
      max: max
    }
  };
}

function drain(entity, amount) {
  return Entity.update(entity, ENERGY, value => Math.max(0, value.current - amount));
}

function fill(entity, amount) {
  return Entity.update(entity, ENERGY, value => Math.min(value.max, value.current + amount));
}
