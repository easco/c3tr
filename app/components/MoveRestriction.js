
// Exports ---------------------------------------------------------------------

export default {
  create
};

// Functions -------------------------------------------------------------------

function create(predicateFn) {
  return {
    key: 'moveRestriction',
    value: predicateFn
  };
}
