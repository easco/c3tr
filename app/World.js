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

function placeEntity(world, entities, entity, count = 1, tileTypes = [TileType.LAND]) {
  const tiles = world.tiles.filter(t => tileTypes.indexOf(t) > -1);
  const total = entities.length + count;

  let randomPos;
  while (entities.length < total) {
    randomPos = Random.from(tiles).position;
    if (entities.filter(e => Position.match(e.position, randomPos)).length === 0) {
      entities = entities.concat(
        entity.create({ position: Random.from(tiles).position })
      );
    }
  }

  return entities;
}

function positionTo(world, source, direction) {
  const destination = Position.to(source, direction);

  destination.x = Util.constrain(destination.x, 0, world.width);

  return destination;
}

function randomEmptyPosition(world, entities, tileTypes) {
  const tiles = world.tiles.filter(t => tileTypes.indexOf(t.type) > -1);
  const collisionEntities = entities.filter(e => e.position && e.collision);

  let okay = false;
  let randomPos;
  while (!okay) {
    randomPos = Random.from(tiles).position;
    okay = collisionEntities
      .filter(e => Position.match(e.position, randomPos))
      .length === 0;
  }

  return randomPos;
}

function randomPosition(world, tileTypes) {
  return Random.from(world.tiles.filter(t => tileTypes.indexOf(t) > -1));
}

function tileAt(world, { x, y }) {
  if (x < 0 || x >= world.width || y < 0 || y >= world.height) return null;
  return world.tiles.find(t => t.position.x === x && t.position.y === y);
}

function tileTo(world, direction, source) {
  return tileAt(world, positionTo(world, direction, source));
}
