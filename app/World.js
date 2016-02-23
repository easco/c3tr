import Position from 'components/Position';
import Random from 'Random';
import Tile from 'Tile';
import Util from 'Util';

// Data ------------------------------------------------------------------------

// Exports ---------------------------------------------------------------------

export default {
  positionTo,
  randomLandPosition,
  tileAt,
  tileTo
};

// Functions -------------------------------------------------------------------

function positionTo(world, source, direction) {
  const destination = Position.to(source, direction);

  destination.x = Util.constrain(destination.x, 0, world.width);

  return destination;
}

function randomLandPosition(world) {
  const x = Random.integer(0, world.width - 1);
  const y = Random.integer(0, world.height - 1);
  const tile = world.tiles[x][y];

  if (Tile.isLand(tile)) {
    return { x, y };
  }

  return randomLandPosition(world);
}

function tileAt(world, { x, y }) {
  if (x < 0 || x >= world.width || y < 0 || y >= world.height) return null;
  return world.tiles[x][y];
}

function tileTo(world, direction, source) {
  return tileAt(world, positionTo(world, direction, source));
}
