import Entity from 'Entity';

// Data ------------------------------------------------------------------------

const HEALTH = 'HEALTH';

// Exports ---------------------------------------------------------------------

export default {
  create,
  heal,
  hit,
  isAlive,
  type: HEALTH
};

// Functions -------------------------------------------------------------------

function create(max) {
  return {
    type: HEALTH,
    value: {
      current: max,
      max
    }
  };
}

function heal(entity, amount) {
  return Entity.update(entity, HEALTH, value => ({
    current: Math.min(value.max, value.current + amount)
  }));
}

function hit(entity, amount) {
  return Entity.update(entity, HEALTH, value => ({
    current: Math.max(0, value.current - amount)
  }));
}

function isAlive(entity) {
  return Entity.get(entity, HEALTH) > 0;
}
