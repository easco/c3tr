import Entity from 'Entity';
import Move from 'components/Move';
import Position from 'components/Position';
import Tile from 'Tile';
import World from 'World';

// Data ------------------------------------------------------------------------

// Exports ---------------------------------------------------------------------

module.exports = {
  run
};

// Functions -------------------------------------------------------------------

function run({ state, world }) {
  const entities = state.entities
    .map(entity => {
      if (!entity.move || !entity.position) return entity;

      // TODO: Check if entity can move to tile
      //const dest = World.tileTo(world, entity.move, entity.position);

      // TODO: Handle "movement cost" component

      console.log(entity.position);
      entity = Move.perform(entity);
      console.log(entity.position);

      return Entity.detach(entity, Move.type);
    });

  return Object.assign({}, state, { entities });
}
