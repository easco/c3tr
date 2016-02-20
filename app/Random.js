
// Data ------------------------------------------------------------------------

const almostOne = 1 - 1e-16;

// Exports ---------------------------------------------------------------------

module.exports = {
  integer
};

// Functions -------------------------------------------------------------------

function integer(min = 0, max = Number.MAX_VALUE) {
  return Math.floor(Math.random() * (max - min + almostOne) + min);
}
