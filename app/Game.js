import Carl from 'entities/Carl';
import Entity from 'Entity';
import Random from 'Random';
import World from 'World';
import { HEALTH } from 'components/Health';
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

function renderView({ carl, message, world }) {
  const messageEl = html('div', { id: 'Message' }, [message]);
  document.body.replaceChild(messageEl, find('#Message'));

  const fieldCanvas = find('#Field');
  const fieldContext = fieldCanvas.getContext('2d');
  fieldContext.clearRect(0, 0, fieldCanvas.width, fieldCanvas.height);
  fieldContext.font = '20px monospace';
  fieldContext.fillStyle = '#ccc';
  for (let x = 0; x < fieldCanvas.width / 20; x ++) {
    for (let y = 0; y < fieldCanvas.height / 20; y++) {
      const character = world[x][y] > 0.1 ? 'X' : '.';
      fieldContext.fillText(character, x * 20, 16 + y * 20);
    }
  }

  console.log(Entity.get(carl, HEALTH));

  const statusEl = html('div', { id: 'Status' }, [
    html('span', { class: 'stats' }, [
      `${Entity.get(carl, HEALTH).current}/${Entity.get(carl, HEALTH).max}HP`,
      html('span', { class: 'cpu' }, [
        text('CPU:'),
      ]),
      `?GHz`
    ]),
    html('span', { class: 'energy' }, [
      `?J (? steps)`
    ])
  ]);
  document.body.replaceChild(statusEl, find('#Status'));
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
