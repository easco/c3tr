
// Data ------------------------------------------------------------------------

const AVATAR = 'avatar';

// Exports ---------------------------------------------------------------------

export default {
  create,
  key: AVATAR
};

// Functions -------------------------------------------------------------------

function create(character, style = '#ccc', importance = 0) {
  return {
    key: AVATAR,
    value: {
      character,
      importance,
      style
    }
  };
}
