import Entity from 'Entity';

// Data ------------------------------------------------------------------------

const ENERGY = 'energy';

// Exports ---------------------------------------------------------------------

export default {
  create,
  drain,
  fill,
  isDrained,
  isFull,
  key: ENERGY
};

// Functions -------------------------------------------------------------------

function create(max) {
  return {
    key: ENERGY,
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

function isDrained(entity) {
  return Entity.get(entity, ENERGY).current <= 0;
}

function isFull(entity) {
  const value = Entity.get(entity, ENERGY);

  return value.current >= value.max;
}
