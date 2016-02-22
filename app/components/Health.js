import Entity from 'Entity';

// Exports ---------------------------------------------------------------------

export default {
  create,
  heal,
  hit,
  isAlive,
  isDead
};

// Functions -------------------------------------------------------------------

function create(max) {
  return {
    key: 'health',
    value: {
      current: max,
      max
    }
  };
}

function heal(entity, amount) {
  return Entity.update(entity, {
    health: value => ({
      current: Math.min(value.max, value.current + amount),
      max: value.max
    })
  });
}

function hit(entity, amount) {
  return Entity.update(entity, {
    health: value => ({
      current: Math.max(0, value.current - amount),
      max: value.max
    })
  });
}

function isAlive(entity) {
  return entity.health > 0;
}

function isDead(entity) {
  return !isAlive(entity);
}
