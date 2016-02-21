
// Data ------------------------------------------------------------------------

const MOVE_EVENT = 'MOVE_EVENT';

// Exports ---------------------------------------------------------------------

module.exports = {
  create,
  type: MOVE_EVENT
};

// Functions -------------------------------------------------------------------

function create(eventFn) {
  return {
    type: MOVE_EVENT,
    value: eventFn
  };
}
