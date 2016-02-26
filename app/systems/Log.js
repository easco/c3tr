import DOM from 'DOM';
import Util from 'Util';

// Exports ---------------------------------------------------------------------

export default {
  run
};

// Functions -------------------------------------------------------------------

function run(model) {
  const messageLog = DOM.find('#Log .content');

  model.state.messages
    .map(m => DOM.html('p', [m]))
    .forEach(p => messageLog.insertBefore(p, messageLog.firstChild));

  return model.state;
}
