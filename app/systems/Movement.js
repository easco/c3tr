import Entity from 'Entity';
import Move from 'components/Move';
import MoveEvent from 'components/MoveEvent';
import MoveRestriction from 'components/MoveRestriction';
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

      const destination = World.tileTo(world, entity.move, entity.position);

      if (destination === null) return entity;

      if (
        Entity.has(entity, MoveRestriction.type)
        && !entity.moveRestriction(entity, destination)
      ) return entity;

      if (Entity.has(entity, MoveEvent.type)) {
        entity = entity.moveEvent(entity, destination);
      }

      return Move.perform(entity);
    });

  return Object.assign({}, state, { entities });
}
