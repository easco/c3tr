
// Exports ---------------------------------------------------------------------

export default {
  create
};

// Functions -------------------------------------------------------------------

function create(character, style = '#ccc', importance = 0) {
  return {
    key: 'avatar',
    value: {
      character,
      importance,
      style
    }
  };
}
