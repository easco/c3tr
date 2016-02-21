import Entity from 'Entity';
import Move from 'components/Move';

// Data ------------------------------------------------------------------------

// Exports ---------------------------------------------------------------------

module.exports = {
  run
};

// Functions -------------------------------------------------------------------

function run({ state, world }) {
  state.entities
    .filter(entity => Entity.has(entity, Move.type))
    .forEach(entity => {
      console.log(entity);
    });

  return Object.assign({}, state);
}
