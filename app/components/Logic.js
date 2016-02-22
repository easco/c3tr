import LogicMode from 'data/LogicMode';

// Data ------------------------------------------------------------------------

const LOGIC = 'logic';

// Exports ---------------------------------------------------------------------

export default {
  create,
  key: LOGIC
};

// Functions -------------------------------------------------------------------

function create(mode = LogicMode.PASSIVE) {
  return {
    key: LOGIC,
    value: mode
  };
}
