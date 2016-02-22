import Entity from 'Entity';
import Random from 'Random';

// Data ------------------------------------------------------------------------

const ID = 'id';

// Exports ---------------------------------------------------------------------

export default {
  create,
  generate,
  key: ID
};

// Functions -------------------------------------------------------------------

function create(id) {
  return {
    key: ID,
    value: id
  };
}

function generate() {
  return create(`${Date.now()}${Random.integer(0, 999)}`);
}
