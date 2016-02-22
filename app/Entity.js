
// Exports ---------------------------------------------------------------------

export default {
  attach,
  create,
  detach,
  get,
  has,
  hasAll,
  is,
  set,
  update
}

// Functions -------------------------------------------------------------------

function keyOf(component) {
  return typeof component === 'string' ? component : component.key;
}

function create(type, components = []) {
  return components
    .reduce((entity, { key, value }) => Object.assign({}, entity, {
      [key]: value
    }), { type });
}

function attach(entity, component) {
  if (entity.hasOwnProperty(component.key)) {
    console.error(`The ${entity.type} entity already has a "${component.key}" property.`);
    return entity;
  }

  return Object.assign({}, entity, { [component.key]: component.value });
}

function detach(entity, component) {
  const componentKey = keyOf(component);
  if (!entity.hasOwnProperty(componentKey)) {
    console.error(`The ${entity.type} entity does not have a "${componentKey}" property.`);
    return entity;
  }

  return Object.keys(entity)
    .filter(key => key !== componentKey)
    .reduce((newEntity, key) => Object.assign({}, newEntity, {
      [key]: entity[key]
    }), {});
}

function get(entity, component) {
  const componentKey = keyOf(component);
  if (!entity.hasOwnProperty(componentKey)) {
    console.error(`The ${entity.type} entity does not have a "${componentKey}" property.`);
    return null;
  }

  return entity[componentKey];
}

function has(entity, component) {
  return entity.hasOwnProperty(keyOf(component));
}

function hasAll(entity, components) {
  return components.reduce((yes, c) => yes && has(entity, c), true);
}

function is(entity, type) {
  return entity.type === (typeof type === 'string' ? type : type.type);
}

function set(entity, component, value) {
  return update(entity, component, () => value);
}

function update(entity, component, fn) {
  const componentKey = keyOf(component);
  if (!entity.hasOwnProperty(componentKey)) {
    console.error(`The entity does not have a "${componentKey}" property.`);
    return entity;
  }

  return Object.keys(entity)
    .reduce((newEntity, key) => Object.assign({}, newEntity, {
      [key]: key === componentKey ? fn(entity[key]) : entity[key]
    }), {});
}
