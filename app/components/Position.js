
// Data ------------------------------------------------------------------------

// Exports ---------------------------------------------------------------------

module.exports = {
  position
};

// Functions -------------------------------------------------------------------

function position(coords) {
  coords = coords || {};

  // there's probably a better way to do this
  // but it gives the object the name property
  // without making name show up with x and y.
  return {
    '__proto__': { name: 'position' },
    x: coords.x || 0,
    y: coords.y || 0
  }
}
