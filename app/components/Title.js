import Random from 'Random';

// Data ------------------------------------------------------------------------

const TITLE = 'TITLE';
const ADJECTIVES = [
  'Autonomous', 'First', 'Giant', 'Humanoid', 'Industrial',
  'Intelligent', 'Little', 'Mechanical', 'Mobile', 'New', 'Small'
];
const NOUNS = [
  'Ball Bearing', 'Bearing', 'Belt', 'Cog', 'Camshaft', 'Component',
  'Controller', 'Crank', 'Module', 'Motor', 'Pinion', 'Seal', 'Sprocket',
  'Valve'
];
const FORMATS = [
  {
    needs: [ADJECTIVES, NOUNS],
    fn: fmt `${0} ${1}`
  }
];

// Exports ---------------------------------------------------------------------

module.exports = {
  generate,
  type: TITLE
};

// Functions -------------------------------------------------------------------

function generate() {
  const format = Random.from(FORMATS);
  const words = format.needs.map(need => Random.from(need));

  return {
    type: TITLE,
    value: format.fn.apply(null, words)
  };
}

function fmt(strings, ...keys) {
  return (function(...values) {
    var dict = values[values.length - 1] || {};
    var result = [strings[0]];
    keys.forEach(function(key, i) {
      var value = Number.isInteger(key) ? values[key] : dict[key];
      result.push(value, strings[i + 1]);
    });
    return result.join('');
  });
}
