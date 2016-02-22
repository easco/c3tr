import Entity from 'Entity';

// Data ------------------------------------------------------------------------

const HEALTH = 'health';

// Exports ---------------------------------------------------------------------

export default {
  create,
  heal,
  hit,
  isAlive,
  isDead,
  key: HEALTH
};

// Functions -------------------------------------------------------------------

function create(max) {
  return {
    key: HEALTH,
    value: {
      current: max,
      max
    }
  };
}

function heal(entity, amount) {
  return Entity.update(entity, HEALTH, value => ({
    current: Math.min(value.max, value.current + amount),
    max: value.max
  }));
}

function hit(entity, amount) {
  return Entity.update(entity, HEALTH, value => ({
    current: Math.max(0, value.current - amount),
    max: value.max
  }));
}

function isAlive(entity) {
  return Entity.get(entity, HEALTH) > 0;
}

function isDead(entity) {
  return !isAlive(entity);
}
