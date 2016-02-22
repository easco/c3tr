
// Data ------------------------------------------------------------------------

const AVATAR = 'AVATAR';

// Exports ---------------------------------------------------------------------

export default {
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
