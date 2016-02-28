import Position from 'components/Position';
import Random from 'Random';
import Util from 'Util';

// Exports ---------------------------------------------------------------------

export default {
  placeEntity,
  positionTo,
  randomEmptyPosition,
  randomPosition,
  tileAt,
  tileTo
};

// Functions -------------------------------------------------------------------

function placeEntity(world, entities, tileTypes, entity, count = 1) {
  const total = entities.length + count;

  while (entities.length < total) {
    entities = entities.concat(entity.create({
      position: randomEmptyPosition(world, entities, tileTypes)
    }));
  }

  return entities;
}

function positionTo(world, source, direction) {
  const destination = Position.to(source, direction);

  destination.x = Util.constrain(destination.x, 0, world.width);

  return destination;
}

function randomEmptyPosition(world, entities, tileTypes) {
  const randomPos = randomPosition(world, tileTypes);

  return entities.find(e => Position.match(e.position, randomPos))
    ? randomEmptyPosition(world, entities, tileTypes)
    : randomPos;
}

function randomPosition(world, tileTypes) {
  const x = Random.integer(0, world.width - 1);
  const y = Random.integer(0, world.height - 1);
  const tile = world.tiles[x][y];

  return tileTypes.indexOf(tile) > -1
    ? { x, y }
    : randomPosition(world, tileTypes);
}

function tileAt(world, { x, y }) {
  if (x < 0 || x >= world.width || y < 0 || y >= world.height) return null;
  return world.tiles[x][y];
}

function tileTo(world, direction, source) {
  return tileAt(world, positionTo(world, direction, source));
}
