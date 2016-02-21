import Random from 'Random';

// Data ------------------------------------------------------------------------

// Exports ---------------------------------------------------------------------

module.exports = {
  create,
  generate
};

// Functions -------------------------------------------------------------------

function create(value) {
  return {
    type: ID,
    value
  };
}

function generate() {
  return create(`${Date.now()}${Random.integer(0, 999)}`);
}
