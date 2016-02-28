import Battery from 'entities/Battery';
import Carl from 'entities/Carl';
import Entity from 'Entity';
import Position from 'components/Position';
import Tile from 'Tile';
import Util from 'Util';
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

  let entities = model.state.entities;

  entities = entities.map(entity => {
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

    const destEntities = entities
      .filter(e => e.position)
      .filter(e => Position.match(e.position, destPos));

    if (Entity.is(entity, Carl)) {
      const collidingEntity = destEntities.find(e => e.collision);
      if (collidingEntity) {
        messages.push(`You bump into a ${collidingEntity.name}.`);
        return Entity.detach(entity, 'move');
      }

      if (destEntities.length > 0) {
        const entityNames = destEntities
          .filter(e => e.name)
          .map(e => `a ${e.name}`)
          .join(', ');
        messages.push(`You see ${entityNames}.`);
      }
    }

    if (entity.moveAction) entity = entity.moveAction(destTile);

    entity = Entity.update(entity, { position: () => destPos });
    entity = Entity.detach(entity, 'move');

    if (entity.suckle) {
      destEntities
        .filter(e => Entity.is(e, Battery))
        .forEach(battery => {
          entity = entity.suckle(battery);
          removeEntities.push(battery);
        });
    }

    return entity;
  }).filter(entity => !removeEntities.includes(entity));

  return Util.merge(model.state, {
    entities,
    messages: model.state.messages.concat(messages)
  });
}
