
// Data ------------------------------------------------------------------------

// Exports ---------------------------------------------------------------------

module.exports = {
  number,
  propName
};

// Functions -------------------------------------------------------------------

function number(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function propName(string) {
  return string.toLowerCase().replace(/_([a-z])/g, (match, c) => c.toUpperCase());
}
