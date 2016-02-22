import Entity from 'Entity';

// Exports ---------------------------------------------------------------------

export default {
  create,
  drain,
  fill,
  isDrained,
  isFull
};

// Functions -------------------------------------------------------------------

function create(max) {
  return {
    key: 'energy',
    value: {
      current: max,
      max
    }
  };
}

function drain(entity, amount) {
  return Entity.update(entity, {
    energy: value => ({
      current: Math.max(0, value.current - amount),
      max: value.max
    })
  });
}

function fill(entity, amount) {
  return Entity.update(entity, {
    energy: value => ({
      current: Math.min(value.max, value.current + amount),
      max: value.max
    })
  });
}

function isDrained(entity) {
  return entity.energy.current <= 0;
}

function isFull(entity) {
  return entity.energy.current >= 0;
}
