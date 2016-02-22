import Entity from 'Entity';

// Data ------------------------------------------------------------------------

const SUCKLE = 'suckle';

// Exports ---------------------------------------------------------------------

export default {
  create,
  key: SUCKLE
};

// Functions -------------------------------------------------------------------

function create(suckleFn) {
  return {
    key: SUCKLE,
    value: suckleFn
  };
}
