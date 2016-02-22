
// Exports ---------------------------------------------------------------------

export default {
  create
};

// Functions -------------------------------------------------------------------

function create(actionFn) {
  return {
    key: 'moveAction',
    value: actionFn
  };
}
