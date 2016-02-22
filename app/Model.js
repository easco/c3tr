
// Data ------------------------------------------------------------------------

// Exports ---------------------------------------------------------------------

export default {
  entitiesAt
};

// Functions -------------------------------------------------------------------

function entitiesAt(model, position) {
  return model.state.entities
    .filter(entity => entity.hasOwnProperty('position'))
    .filter(entity =>
      entity.position.x === position.x
      && entity.position.y === position.y
    );
}
