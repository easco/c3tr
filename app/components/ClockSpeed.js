
// Data ------------------------------------------------------------------------

const CLOCK_SPEED = 'CLOCK_SPEED';

// Exports ---------------------------------------------------------------------

export default {
  create,
  type: CLOCK_SPEED
};

// Functions -------------------------------------------------------------------

function create(speed) {
  return {
    type: CLOCK_SPEED,
    value: speed
  };
}
