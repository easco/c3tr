import Entity from 'Entity';

// Exports ---------------------------------------------------------------------

export default {
  addItem,
  create,
  empty,
  isEmpty,
  removeItem
};

// Functions -------------------------------------------------------------------

function addItem(entity, item) {
  return Entity.update(entity, {
    inventory: contents => contents.concat(item)
  });
}

function create(contents = []) {
  return {
    key: 'inventory',
    value: contents
  };
}

function empty(entity) {
  return Entity.update(entity, {
    inventory: () => []
  });
}

function isEmpty(entity) {
  return entity.inventory.length === 0;
}

function removeItem(entity, item) {
  return Entity.update(entity, {
    inventory: contents => contents.filter(i => i !== item)
  });
}
