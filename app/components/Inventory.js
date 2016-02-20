import Entity from 'Entity';

// Data ------------------------------------------------------------------------

const INVENTORY = 'INVENTORY';

// Exports ---------------------------------------------------------------------

module.exports = {
  add,
  create,
  empty,
  remove,
  type: INVENTORY
};

// Functions -------------------------------------------------------------------

function add(entity, item) {
  return Entity.update(entity, INVENTORY, contents => contents.concat(item));
}

function create(contents = []) {
  return {
    type: INVENTORY,
    value: contents
  };
}

function empty(entity) {
  return Entity.update(entity, INVENTORY, () => []);
}

function remove(entity, item) {
  return Entity.update(entity, INVENTORY, contents =>
    contents.filter(thing => thing !== item)
  );
}
