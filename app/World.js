import FastSimplexNoise from 'fast-simplex-noise';

// Data ------------------------------------------------------------------------

// Exports ---------------------------------------------------------------------

module.exports = {
  generate
};

// Functions -------------------------------------------------------------------

function generate(width, height) {
  const wallNoise = new FastSimplexNoise();
  const grid = new Array(width);

  for (let x = 0; x < width; x++) {
    grid[x] = new Array(height);
    for (let y = 0; y < height; y++) {
      grid[x][y] = wallNoise.in2D(x, y);
    }
  }

  return grid;
}
