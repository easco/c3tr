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
  let tile, x, y;
  while (true) {
    x = Random.integer(0, world.width - 1);
    y = Random.integer(0, world.height - 1);
    tile = world.tiles[x][y];

    if (Tile.isLand(tile)) {
      return { x, y };
    }
  }
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
