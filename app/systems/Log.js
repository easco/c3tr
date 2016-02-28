import DOM from 'DOM';

// Exports ---------------------------------------------------------------------

export default {
  run
};

// Functions -------------------------------------------------------------------

function run(model) {
  const messageLog = DOM.find('#Log .content');

  model.state.messages
    .map(m => DOM.html('p', [
      DOM.text(m.text),
      DOM.html('span.position', `(${m.position.x + 1}, ${m.position.y + 1})`)
    ]))
    .forEach(p => messageLog.insertBefore(p, messageLog.firstChild));

  return model.state;
}
