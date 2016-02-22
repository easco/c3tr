
// Data ------------------------------------------------------------------------

const MOVE_ACTION = 'moveAction';

// Exports ---------------------------------------------------------------------

export default {
  create,
  key: MOVE_ACTION,
  perform
};

// Functions -------------------------------------------------------------------

function create(actionFn) {
  return {
    key: MOVE_ACTION,
    value: actionFn
  };
}

function perform(entity, tile) {
  return Entity.get(entity, MOVE_ACTION)(entity, tile);
}
