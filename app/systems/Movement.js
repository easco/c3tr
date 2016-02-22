import Battery from 'entities/Battery';
import Carl from 'entities/Carl';
import Entity from 'Entity';
import Model from 'Model';
import Move from 'components/Move';
import Position from 'components/Position';
import World from 'World';

// Exports ---------------------------------------------------------------------

export default {
  run
};

// Functions -------------------------------------------------------------------

function run(model) {
  const messages = [];
  const removeEntities = [];

  const entities = model.state.entities
    .map(entity => {
      if (!entity.move || !entity.position) return entity;

      const destTile = World.tileTo(model.world, entity.move, entity.position);

      if (
        destTile === null
        || (entity.moveRestriction && !entity.moveRestriction(destTile))
      ) {
        return Entity.detach(entity, 'move');
      }

      if (Entity.is(entity, Carl)) {
        const destPosition = Position.from(entity.position, entity.move);

        Model.entitiesAt(model, destPosition)
          .filter(entity => entity.hasOwnProperty('name'))
          .forEach(entity => {
            messages.push(`You encounter a ${entity.name}.`);
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
