import Position from 'components/Position';
import Random from 'Random';
import Tile from 'Tile';

// Data ------------------------------------------------------------------------

// Exports ---------------------------------------------------------------------

export default {
  randomLandPosition,
  tileAt,
  tileTo
};

// Functions -------------------------------------------------------------------

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
  return world.tiles[x][y];
}

function tileTo(world, direction, source) {
  const destination = Position.from(source, direction);

  if (destination.x < 0
    || destination.x >= world.width
    || destination.y < 0
    || destination.y >= world.height
  ) return null;

  return tileAt(world, destination);
}
