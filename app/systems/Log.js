import DOM from 'DOM';
import Util from 'Util';

// Exports ---------------------------------------------------------------------

export default {
  run
};

// Functions -------------------------------------------------------------------

function run(model) {
  model.state.messages.forEach(m => logMessage(m));

  return Util.merge(model.state, { messages: [] });
}

function logMessage(message) {
  const log = DOM.find('#Log');
  const messageP = DOM.html('p', {}, [message]);

  log.insertBefore(messageP, log.firstChild);
}
