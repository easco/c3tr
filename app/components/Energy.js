import Entity from 'Entity';

// Data ------------------------------------------------------------------------

const ENERGY = 'ENERGY';

// Exports ---------------------------------------------------------------------

export default {
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
      max
    }
  };
}

function drain(entity, amount) {
  return Entity.update(entity, ENERGY, value => ({
    current: Math.max(0, value.current - amount),
    max: value.max
  }));
}

function fill(entity, amount) {
  return Entity.update(entity, ENERGY, value => ({
    current: Math.min(value.max, value.current + amount),
    max: value.max
  }));
}
