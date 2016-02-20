import FastSimplexNoise from 'fast-simplex-noise';
import Tile from 'entities/Tile';

// Data ------------------------------------------------------------------------

// Exports ---------------------------------------------------------------------

module.exports = {
  generate
};

// Functions -------------------------------------------------------------------

function generate(width, height) {
  const elevationNoise = new FastSimplexNoise({
    frequency: 0.03,
    max: 10,
    min: -10,
    octaves: 8
  });
  const grid = new Array(width);

  for (let x = 0; x < width; x++) {
    grid[x] = new Array(height);
    for (let y = 0; y < height; y++) {
      grid[x][y] = Tile.create({ x, y }, elevationNoise.in2D(x, y), []);
    }
  }

  return grid;
}
