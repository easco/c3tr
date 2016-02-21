import Entity from 'Entity';
import Energy from 'components/Energy';
import Game from 'Game';
import Move from 'components/Move';
import MoveEvent from 'components/MoveEvent';
import MoveRestriction from 'components/MoveRestriction';
import Position from 'components/Position';
import Tile from 'Tile';
import World from 'World';
import Suckle from 'components/Suckle'

// Data ------------------------------------------------------------------------

// Exports ---------------------------------------------------------------------

module.exports = {
  run
};

// Functions -------------------------------------------------------------------

function run(model) {
  const entities = model.state.entities
    .map(entity => {
      if (!entity.move || !entity.position) return entity;

      const destination = World.tileTo(model.world, entity.move, entity.position);

      if (destination === null) return Entity.detach(entity, Move.type);

      if (
        Entity.has(entity, MoveRestriction.type)
        && !entity.moveRestriction(entity, destination)
      ) return Entity.detach(entity, Move.type);

      if (Entity.has(entity, MoveEvent.type)) {
        entity = entity.moveEvent(entity, destination);
      }

      entity = Move.perform(entity);

      if (Entity.has(entity, Suckle.type)) {
        const entitiesAtTile = entitiesAt(model, entity.position);

        if ( entitiesAtTile.length > 1 && Entity.has(entitiesAtTile[1], Energy.type) ) {
          entity = entity.suckle(entity, entitiesAtTile[1]);
        }
      }

      return entity;
    });

  return Object.assign({}, model.state, { entities });
}

function entitiesAt(model, position) {
  return model.state.entities
    .filter(entity => entity.position.x === position.x && entity.position.y === position.y);
}
