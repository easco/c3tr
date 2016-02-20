
// Data ------------------------------------------------------------------------

const CLOCK_SPEED = 'CLOCK_SPEED';

// Exports ---------------------------------------------------------------------

module.exports = {
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
