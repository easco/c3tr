import Entity from 'Entity';
import Energy from 'components/Energy';
import Model from 'Model';
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
  let messages = [];
  const entities = model.state.entities
    .map(entity => {
      if (!entity.move || !entity.position) return entity;

      const destination = World.tileTo(model.world, entity.move, entity.position);

      if (destination === null) return Entity.detach(entity, Move.type);

      if (
        Entity.has(entity, MoveRestriction.type)
        && !entity.moveRestriction(entity, destination)
      ) return Entity.detach(entity, Move.type);

      if (entity.name === 'Carl') {
        const destinationPosition = Position.from(entity.position, entity.move);

        Model.entitiesAt(model, destinationPosition)
          .filter(entity => entity.hasOwnProperty('name'))
          .forEach(entity => {
            messages = messages.concat(`You encounter a ${entity.name}.`)
          });
      }

      if (Entity.has(entity, MoveEvent.type)) {
        entity = entity.moveEvent(entity, destination);
      }

      entity = Move.perform(entity);

      if (Entity.has(entity, Suckle.type)) {
        const entitiesAtTile = Model.entitiesAt(model, entity.position);

        if (
          entitiesAtTile.length > 1
          && Entity.has(entitiesAtTile[1], Energy.type)
        ) {
          entity = entity.suckle(entity, entitiesAtTile[1]);
        }
      }

      return entity;
    });

  return Object.assign({}, model.state, {
    entities,
    messages: model.state.messages.concat(messages)
  });
}
