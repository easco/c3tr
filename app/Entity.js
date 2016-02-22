
// Exports ---------------------------------------------------------------------

export default {
  attach,
  create,
  detach,
  is,
  update
};

// Functions -------------------------------------------------------------------

function attach(entity, component) {
  if (entity.hasOwnProperty(component.key)) {
    console.error(`The ${entity.type} entity already has a "${component.key}" property.`);
    return entity;
  }

  return Object.assign({}, entity, { [component.key]: component.value });
}

function create(type, components = []) {
  return components
    .reduce((entity, { key, value }) => Object.assign({}, entity, {
      [key]: value
    }), { type });
}

function detach(entity, componentKey) {
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

function is(entity, entityType) {
  return entity.type === entityType.type;
}

function update(entity, properties) {
  const okay = Object.keys(properties)
    .reduce((yes, propKey) => {
      if (!entity.hasOwnProperty(propKey)) {
        console.error(`The ${entity.type} entity does not have a "${propKey}" property.`);
        return false;
      }

      return yes && true;
    }, true);

  if (!okay) return entity;

  return Object.assign({}, entity, Object.keys(properties)
    .reduce((props, propKey) => (
      Object.assign({}, props, {
        [propKey]: properties[propKey](entity[propKey])
      })
    ), {})
  );
}
