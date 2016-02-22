
// Data ------------------------------------------------------------------------

const BACKGROUND_COLOR = 'backgroundColor';

// Exports ---------------------------------------------------------------------

export default {
  create,
  key: BACKGROUND_COLOR
};

// Functions -------------------------------------------------------------------

function create(value) {
  return {
    key: BACKGROUND_COLOR,
    value
  };
}
