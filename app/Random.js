
// Data ------------------------------------------------------------------------

const almostOne = 1 - 1e-16; // The highest float less than 1

// Exports ---------------------------------------------------------------------

module.exports = {
  character,
  from,
  integer
};

// Functions -------------------------------------------------------------------

function character() {
  return from([
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
  ]);
}

function from(enumerable) {
  if (Array.isArray(enumerable)) {
    return enumerable[integer(0, enumerable.length - 1)];
  }

  return enumerable[from(Object.keys(enumerable))];
}

function integer(min = 0, max = Number.MAX_VALUE) {
  return Math.floor(Math.random() * (max - min + almostOne) + min);
}
