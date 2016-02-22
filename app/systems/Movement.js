import Battery from 'entities/Battery';
import Carl from 'entities/Carl';
import Entity from 'Entity';
import Energy from 'components/Energy';
import Model from 'Model';
import Move from 'components/Move';
import MoveAction from 'components/MoveAction';
import MoveRestriction from 'components/MoveRestriction';
import Position from 'components/Position';
import Tile from 'Tile';
import World from 'World';
import Suckle from 'components/Suckle'

// Data ------------------------------------------------------------------------

// Exports ---------------------------------------------------------------------

export default {
  run
};

// Functions -------------------------------------------------------------------

function run(model) {
  let messages = [];
  let removeEntities = [];

  const entities = model.state.entities
    .map(entity => {
      if (!entity.move || !entity.position) return entity;

      const destTile = World.tileTo(model.world, entity.move, entity.position);

      if (destTile === null) return Entity.detach(entity, Move.key);

      if (entity.moveRestriction && !entity.moveRestriction(destTile)) {
        return Entity.detach(entity, Move);
      }

      if (Entity.is(entity, Carl)) {
        const destPosition = Position.from(entity.position, entity.move);

        Model.entitiesAt(model, destPosition)
          .filter(entity => entity.hasOwnProperty('name'))
          .forEach(entity => {
            messages = messages.concat(`You encounter a ${entity.name}.`)
          });
      }

      if (entity.moveAction) entity = entity.moveAction(destTile);

      entity = Move.perform(entity);

      if (entity.suckle) {
        Model.entitiesAt(model, entity.position)
          .filter(e => Entity.is(e, Battery))
          .forEach(battery => {
            entity = entity.suckle(battery);
            removeEntities.push(battery);
          });
      }

      return entity;
    })
    .filter(entity => !removeEntities.includes(entity));

  return Object.assign({}, model.state, {
    entities,
    messages: model.state.messages.concat(messages)
  });
}
