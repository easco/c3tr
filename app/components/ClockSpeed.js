
// Data ------------------------------------------------------------------------

const CLOCK_SPEED = 'clockSpeed';

// Exports ---------------------------------------------------------------------

export default {
  create,
  key: CLOCK_SPEED
};

// Functions -------------------------------------------------------------------

function create(value) {
  return {
    key: CLOCK_SPEED,
    value
  };
}
