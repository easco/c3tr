import LogicMode from 'data/LogicMode';

// Data ------------------------------------------------------------------------

const LOGIC = 'LOGIC';

// Exports ---------------------------------------------------------------------

export default {
  create,
  type: LOGIC
};

// Functions -------------------------------------------------------------------

function create(mode = LogicMode.PASSIVE) {
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
