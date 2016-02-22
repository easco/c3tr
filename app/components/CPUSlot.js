import Entity from 'Entity';

// Exports ---------------------------------------------------------------------

export default {
  create,
  empty,
  insert,
  isEmpty
};

// Functions -------------------------------------------------------------------

function create(cpu = null) {
  return {
    key: 'cpuSlot',
    value: { cpu }
  };
}

function empty(entity) {
  return Entity.update(entity, {
    cpuSlot: () => ({ cpu: null })
  });
}

function insert(entity, cpu) {
  return Entity.update(entity, {
    cpuSlot: () => ({ cpu })
  });
}

function isEmpty(entity) {
  return entity.cpuSlot.cpu === null;
}
