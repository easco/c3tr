import Random from 'Random';
import { find, html, text } from 'DOM';

// Data ------------------------------------------------------------------------

// Exports ---------------------------------------------------------------------

module.exports = {
  init,
  load,
  save,
  update,
  view
};

// Functions -------------------------------------------------------------------

function getInitialModel() {
  const maxHealth = Random.integer(20, 100); // FIXME: Temporary!

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
  view(load() || getInitialModel());

  window.addEventListener('keydown', event => {
    // TODO: Handle keydown event
    console.log('Keydown:', event);
  });
}

function load() {
  return JSON.parse(localStorage.getItem('state'));
}

function save(state) {
  localStorage.setItem('state', JSON.stringify(state));
}

function update(action, model) {
  // TODO: Define `newModel` base on `action`
  // TODO: `save(newModel);`
  // TODO: `return newModel;`

  return model; // FIXME: Temp
}

function view({ field, message, status }) {
  console.log(field, message, status);
  const messageEl = html('div', { id: 'Message' }, [message]);
  const fieldEl = html('pre', { id: 'Field' }, [field]);

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

  document.body.replaceChild(messageEl, find('#Message'));
  document.body.replaceChild(fieldEl, find('#Field'));
  document.body.replaceChild(statusEl, find('#Status'));
}
