
// Exports ---------------------------------------------------------------------

export default {
  constrain,
  logTime,
  merge
};

// Functions -------------------------------------------------------------------

function constrain(number, min, max) {
  if (min >= max) throw new Error('`min` must be less than `max`');

  const span = max - min;

  while (number < min) return constrain(number + span, min, max);
  while (number >= max) return constrain(number - span, min, max);
  return number;
}

function logTime(task, fn, rateFn) {
  const start = Date.now();
  const value = fn();
  const end = Date.now();
  const total = end - start;

  const rateString = rateFn
    ? ` ${rateFn(total)}`
    : '';

  console.log(`${task} took`, total, `ms${rateString}`);
  return value;
}

function merge(a, b) {
  return Object.assign({}, a, b);
}
