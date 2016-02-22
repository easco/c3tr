import LogicMode from 'data/LogicMode';

// Exports ---------------------------------------------------------------------

export default {
  create
};

// Functions -------------------------------------------------------------------

function create(mode = LogicMode.PASSIVE) {
  return {
    key: 'logic',
    value: mode
  };
}
