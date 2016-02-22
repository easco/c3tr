import Entity from 'Entity';

// Data ------------------------------------------------------------------------

const CPU_SLOT = 'cpuSlot';

// Exports ---------------------------------------------------------------------

export default {
  create,
  empty,
  insert,
  isEmpty,
  key: CPU_SLOT
};

// Functions -------------------------------------------------------------------

function create(cpu = null) {
  return {
    key: CPU_SLOT,
    value: { cpu }
  };
}

function empty(entity) {
  return Entity.update(entity, CPU_SLOT, () => { cpu: null });
}

function insert(entity, cpu) {
  return Entity.update(entity, CPU_SLOT, () => { cpu });
}

function isEmpty(entity) {
  return Entity.get(entity, CPU_SLOT).cpu === null;
}
