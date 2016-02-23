import Battery from 'entities/Battery';
import Carl from 'entities/Carl';
import Entity from 'Entity';
import Model from 'Model';
import Tile from 'Tile';
import World from 'World';

// Exports ---------------------------------------------------------------------

export default {
  run
};

// Functions -------------------------------------------------------------------

function run(model) {
  const messages = [];
  const removeEntities = [];
  const world = model.world;

  const entities = model.state.entities
    .map(entity => {
      if (!entity.move || !entity.position) return entity;

      const destPos = World.positionTo(world, entity.position, entity.move);
      const destTile = World.tileAt(world, destPos);

      if (
        destTile === null
        || !Tile.isPassable(destTile)
        || (entity.moveRestriction && !entity.moveRestriction(destTile))
      ) {
        return Entity.detach(entity, 'move');
      }

      if (Entity.is(entity, Carl)) {
        Model.entitiesAt(model, destPos)
          .filter(entity => entity.hasOwnProperty('name'))
          .forEach(entity => {
            messages.push(`You encounter a ${entity.name}.`);
          });
      }

      if (entity.moveAction) entity = entity.moveAction(destTile);

      entity = Entity.update(entity, { position: () => destPos });
      entity = Entity.detach(entity, 'move');

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
