
// Data ------------------------------------------------------------------------

const BACKGROUND_COLOR = 'BACKGROUND_COLOR';

// Exports ---------------------------------------------------------------------

module.exports = {
  create,
  type: BACKGROUND_COLOR
};

// Functions -------------------------------------------------------------------

function create(color) {
  return {
    type: BACKGROUND_COLOR,
    value: color
  };
}
