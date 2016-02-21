
// Data ------------------------------------------------------------------------

const MOVE_RESTRICTION = 'MOVE_RESTRICTION';

// Exports ---------------------------------------------------------------------

module.exports = {
  create,
  type: MOVE_RESTRICTION
};

// Functions -------------------------------------------------------------------

function create(predicateFn) {
  return {
    type: MOVE_RESTRICTION,
    value: predicateFn
  };
}
