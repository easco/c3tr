
// Data ------------------------------------------------------------------------

const AVATAR = 'AVATAR';

// Exports ---------------------------------------------------------------------

module.exports = {
  create,
  type: AVATAR
};

// Functions -------------------------------------------------------------------

function create(character, style = '#ccc', importance = 0) {
  return {
    type: AVATAR,
    value: {
      character,
      importance,
      style
    }
  };
}
