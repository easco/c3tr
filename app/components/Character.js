
// Data ------------------------------------------------------------------------

const CHARACTER = 'CHARACTER';

// Exports ---------------------------------------------------------------------

module.exports = {
  create,
  type: CHARACTER
};

// Functions -------------------------------------------------------------------

function create(character) {
  return {
    type: CHARACTER,
    value: character
  };
}
