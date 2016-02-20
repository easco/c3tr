import Entity from 'Entity';

// Data ------------------------------------------------------------------------

const ELEVATION = 'ELEVATION';

// Exports ---------------------------------------------------------------------

module.exports = {
  create,
  isLand,
  type: ELEVATION
};

// Functions -------------------------------------------------------------------

function create(level) {
  return {
    type: ELEVATION,
    value: level
  };
}

function isLand(entity) {
  return Entity.get(entity, ELEVATION) > 0;
}
