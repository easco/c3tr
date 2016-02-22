import Random from 'Random';

// Exports ---------------------------------------------------------------------

export default {
  create,
  generate
};

// Functions -------------------------------------------------------------------

function create(id) {
  return {
    key: 'id',
    value: id
  };
}

function generate() {
  return create(`${Date.now()}${Random.integer(0, 999)}`);
}
