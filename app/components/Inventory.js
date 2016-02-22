import Entity from 'Entity';

// Data ------------------------------------------------------------------------

const INVENTORY = 'inventory';

// Exports ---------------------------------------------------------------------

export default {
  addItem,
  create,
  empty,
  isEmpty,
  key: INVENTORY,
  removeItem
};

// Functions -------------------------------------------------------------------

function addItem(entity, item) {
  return Entity.update(entity, INVENTORY, contents => contents.concat(item));
}

function create(contents = []) {
  return {
    key: INVENTORY,
    value: contents
  };
}

function empty(entity) {
  return Entity.update(entity, INVENTORY, () => []);
}

function isEmpty(entity) {
  return Entity.get(entity, INVENTORY).length === 0;
}

function removeItem(entity, item) {
  return Entity.set(entity, INVENTORY, contents =>
    contents.filter(thing => thing !== item)
  );
}
