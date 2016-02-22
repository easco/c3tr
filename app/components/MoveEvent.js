
// Data ------------------------------------------------------------------------

const MOVE_EVENT = 'MOVE_EVENT';

// Exports ---------------------------------------------------------------------

export default {
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
