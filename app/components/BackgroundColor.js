
// Data ------------------------------------------------------------------------

const BACKGROUND_COLOR = 'BACKGROUND_COLOR';

// Exports ---------------------------------------------------------------------

export default {
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
