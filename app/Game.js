import Random from 'Random';
import { find, html, text } from 'DOM';

// Data ------------------------------------------------------------------------

// Exports ---------------------------------------------------------------------

module.exports = {
  init
};

// Functions -------------------------------------------------------------------

function getInitialModel() {
  // TODO: Generate world
  // TODO: Generate Carl

  const maxHealth = Random.integer(20, 100);

  return {
    field: '------',
    message: 'You are Carl, a time-traveling robot.',
    status: {
      cpuSpeed: Random.integer(1, 5) / 10,
      energy: 64800,
      health: maxHealth,
      maxHealth,
      steps: 5400
    }
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

function renderView({ field, message, status }) {
  const messageEl = html('div', { id: 'Message' }, [message]);
  document.body.replaceChild(messageEl, find('#Message'));

  const fieldCanvas = find('#Field');
  const fieldContext = fieldCanvas.getContext('2d');
  fieldContext.clearRect(0, 0, fieldCanvas.width, fieldCanvas.height);
  fieldContext.font = '20px monospace';
  fieldContext.fillStyle = '#ccc';
  for (let x = 0; x < fieldCanvas.width; x += 20) {
    for (let y = 16; y < fieldCanvas.height; y += 20) {
      fieldContext.fillText(Random.character(), x, y);
    }
  }

  const statusEl = html('div', { id: 'Status' }, [
    html('span', { class: 'stats' }, [
      `${status.health}/${status.maxHealth}HP`,
      html('span', { class: 'cpu' }, [
        text('CPU:'),
      ]),
      `${status.cpuSpeed}GHz`
    ]),
    html('span', { class: 'energy' }, [
      `${status.energy}J (${status.steps} steps)`
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
