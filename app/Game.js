import Carl from 'entities/Carl';
import renderField from 'views/field';
import renderMessage from 'views/message';
import renderStatus from 'views/status';
import World from 'World';
import { find, html, text } from 'DOM';

// Data ------------------------------------------------------------------------

// Exports ---------------------------------------------------------------------

module.exports = {
  init
};

// Functions -------------------------------------------------------------------

function getInitialModel() {
  return {
    carl: Carl.create(),
    message: 'You are Carl, a time-traveling robot.',
    world: World.generate(1024, 1024)
  };
}

function init() {
  let model = load() || getInitialModel();
  resizeField(window.innerWidth, window.innerHeight);
  renderView(model);

  window.addEventListener('keydown', event => {
    model = update(event.code, model);
    renderView(model);
  });

  window.addEventListener('resize', () => {
    resizeField(window.innerWidth, window.innerHeight);
    renderView(model);
  });
}

function load() {
  return JSON.parse(localStorage.getItem('state'));
}

function renderView(model) {
  renderMessage(model);
  renderField(model);
  renderStatus(model);
}

function resizeField(width, height) {
  const field = find('#Field');

  field.setAttribute('width', width);
  field.setAttribute('height', height - 80);
}

function save(state) {
  localStorage.setItem('state', JSON.stringify(state));
}

function update(action, model) {
  // TODO: Define `newModel` based on `action`
  // TODO: `save(newModel);`
  // TODO: `return newModel;`

  return model; // FIXME: Temp
}
