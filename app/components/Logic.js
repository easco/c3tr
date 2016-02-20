
// Data ------------------------------------------------------------------------

const LOGIC = 'LOGIC';

const Mode = Object.freeze({
  HOSTILE: 'HOSTILE',
  PASSIVE: 'PASSIVE'
});

// Exports ---------------------------------------------------------------------

module.exports = {
  Mode,
  create,
  type: LOGIC
};

// Functions -------------------------------------------------------------------

function create(mode) {
  return {
    type: LOGIC,
    value: {
      action: null,
      mode
    }
  };
}

function decide(entity, model) {
  // TODO: Update entity's LOGIC action based on its mode and the (world) model
}
