import Entity from 'Entity';

// Data ------------------------------------------------------------------------

const SUCKLE = 'SUCKLE';

// Exports ---------------------------------------------------------------------

module.exports = {
  create,
  type: SUCKLE
};

// Functions -------------------------------------------------------------------

function create(fn) {
  return {
    type: SUCKLE,
    value: fn
  };
}
