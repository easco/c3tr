
// Exports ---------------------------------------------------------------------

export default {
  create
};

// Functions -------------------------------------------------------------------

function create(suckleFn) {
  return {
    key: 'suckle',
    value: suckleFn
  };
}
