
// Data ------------------------------------------------------------------------

const NAME = 'NAME';

// Exports ---------------------------------------------------------------------

export default {
  create,
  type: NAME
};

// Functions -------------------------------------------------------------------

function create(value) {
  return {
    type: NAME,
    value
  };
}
