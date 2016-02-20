
// Data ------------------------------------------------------------------------

const almostOne = 1 - 1e-16; // The highest float less than 1

// Exports ---------------------------------------------------------------------

module.exports = {
  from,
  integer
};

// Functions -------------------------------------------------------------------

function from(enumerable) {
  if (Array.isArray(enumerable)) {
    return enumerable[integer(0, enumerable.length - 1)];
  }

  return enumerable[from(Object.keys(enumerable))];
}

function integer(min = 0, max = Number.MAX_VALUE) {
  return Math.floor(Math.random() * (max - min + almostOne) + min);
}
