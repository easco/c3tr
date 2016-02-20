import Elevation from 'components/Elevation';
import Entity from 'Entity';
import FastSimplexNoise from 'fast-simplex-noise';
import Random from 'Random';
import Tile from 'entities/Tile';

// Data ------------------------------------------------------------------------

// Exports ---------------------------------------------------------------------

module.exports = {
  emptyLandPosition,
  generate
};

// Functions -------------------------------------------------------------------

function emptyLandPosition(world) {
  let tile, x, y;
  while (true) {
    x = Random.integer(0, world.width);
    y = Random.integer(0, world.height);
    tile = world.tiles[x][y];

    if (Elevation.isLand(tile) && Tile.isEmpty(tile)) {
      return { x,y };
    }
  }
}

function generate(width, height) {
  const elevationNoise = new FastSimplexNoise({
    frequency: 0.03,
    max: 10,
    min: -10,
    octaves: 8
  });

  const tiles = new Array(width);
  for (let x = 0; x < width; x++) {
    tiles[x] = new Array(height);
    for (let y = 0; y < height; y++) {
      tiles[x][y] = Tile.create({ x, y }, elevationNoise.in2D(x, y));
    }
  }

  return {
    height,
    tiles,
    width
  };
}
