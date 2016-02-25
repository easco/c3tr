import Position from 'components/Position';
import Random from 'Random';
import Tile from 'Tile';
import TileType from 'data/TileType';
import Util from 'Util';

// Data ------------------------------------------------------------------------

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

function placeEntity(world, entities, count, entity, tiles = [TileType.LAND]) {
  const total = entities.length + count;

  while (entities.length < total) {
    const randomEmptyPos = randomEmptyPosition(world, entities, tiles);
    entities = entities.concat(
      entity.create({ position: randomEmptyPosition(world, entities, tiles) })
    );
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
  const okay = entities
    .filter(e => e.position && e.collision)
    .filter(e => Position.match(e.position, randomPos))
    .length === 0;

  return okay ? randomPos : randomEmptyPosition(world, entities, tileTypes);
}

function randomPosition(world, tileTypes) {
  const x = Random.integer(0, world.width - 1);
  const y = Random.integer(0, world.height - 1);
  const tile = world.tiles[x][y];

  const okay = tileTypes.reduce((yes, type) => yes && Tile.is(tile, type), true);

  return okay ? { x, y } : randomPosition(world, tileTypes);
}

function tileAt(world, { x, y }) {
  if (x < 0 || x >= world.width || y < 0 || y >= world.height) return null;
  return world.tiles[x][y];
}

function tileTo(world, direction, source) {
  return tileAt(world, positionTo(world, direction, source));
}
