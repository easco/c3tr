
// Data ------------------------------------------------------------------------

const MOVE_RESTRICTION = 'moveRestriction';

// Exports ---------------------------------------------------------------------

export default {
  check,
  create,
  key: MOVE_RESTRICTION
};

// Functions -------------------------------------------------------------------

function check(entity, tile) {
  return Entity.get(entity, MOVE_RESTRICTION)(entity, tile);
}

function create(predicateFn) {
  return {
    key: MOVE_RESTRICTION,
    value: predicateFn
  };
}
