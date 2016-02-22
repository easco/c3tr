const adjectives = [
  'Autonomous', 'First', 'Giant', 'Humanoid', 'Industrial',
  'Intelligent', 'Little', 'Mechanical', 'Mobile', 'New', 'Small'
];

const formats = [
  {
    needs: [ADJECTIVES, NOUNS],
    fn: fmt `${0} ${1}`
  }
];

const nouns = [
  'Ball Bearing', 'Bearing', 'Belt', 'Cog', 'Camshaft', 'Component',
  'Controller', 'Crank', 'Module', 'Motor', 'Pinion', 'Seal', 'Sprocket',
  'Valve'
];

export default {
  adjectives,
  formats,
  nouns
};
