import Entity from 'Entity';

// Data ------------------------------------------------------------------------

const OCCUPANT = 'OCCUPANT';

// Exports ---------------------------------------------------------------------

module.exports = {
  clear,
  create,
  isOccupied,
  place,
  type: OCCUPANT
};

// Functions -------------------------------------------------------------------

function clear(entity) {
  return Entity.update(entity, OCCUPANT, () => null);
}

function create(occupant = null) {
  return {
    type: OCCUPANT,
    value: occupant
  };
}

function isOccupied(entity) {
  return Entity.get(entity, OCCUPANT, occupant => occupant !== null);
}

function place(entity, occupant) {
  return Entity.update(entity, OCCUPANT, () => occupant);
}
