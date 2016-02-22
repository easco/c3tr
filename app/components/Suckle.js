import Entity from 'Entity';

// Data ------------------------------------------------------------------------

const SUCKLE = 'SUCKLE';

// Exports ---------------------------------------------------------------------

export default {
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
