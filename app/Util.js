
// Exports ---------------------------------------------------------------------

export default {
  constrain
};

// Functions -------------------------------------------------------------------

function constrain(number, min, max) {
  if (min >= max) throw new Error('`min` must be less than `max`');

  const span = max - min;

  while (number < min) return constrain(number + span, min, max);
  while (number >= max) return constrain(number - span, min, max);
  return number;
}
