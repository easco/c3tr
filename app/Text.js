
// Exports ---------------------------------------------------------------------

export default {
  capitalize,
  formatNumber
};

// Functions -------------------------------------------------------------------

function capitalize(text) {
  if (!text.hasOwnProperty('length') || text.length < 1) return '';
  return text.slice(0, 1).toUpperCase() + text.slice(1);
}

function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
