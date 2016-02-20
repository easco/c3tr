
// Data ------------------------------------------------------------------------

const AVATAR = 'AVATAR';

// Exports ---------------------------------------------------------------------

module.exports = {
  create,
  type: AVATAR
};

// Functions -------------------------------------------------------------------

function create(character, style = '#ccc') {
  return {
    type: AVATAR,
    value: {
      character,
      style
    }
  };
}
