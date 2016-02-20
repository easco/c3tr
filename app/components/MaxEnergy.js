
// Data ------------------------------------------------------------------------

const MAX_ENERGY = 'MAX_ENERGY';

// Exports ---------------------------------------------------------------------

module.exports = {
  create,
  type: MAX_ENERGY
};

// Functions -------------------------------------------------------------------

function create(level = 0) {
  return {
    type: MAX_ENERGY,
    value: level
  };
}
