import Entity from 'Entity';
import Random from 'Random';

// Data ------------------------------------------------------------------------

const ID = 'ID';

// Exports ---------------------------------------------------------------------

export default {
  create,
  find,
  generate,
  type: ID
};

// Functions -------------------------------------------------------------------

function create(value) {
  return {
    type: ID,
    value
  };
}

function find(entities, id) {
  return entities.find(entity => Entity.get(entity, ID) === id);
}

function generate() {
  return create(`${Date.now()}${Random.integer(0, 999)}`);
}
