import Key from 'data/Key';

// Exports ---------------------------------------------------------------------

export default {
  create,
  destroy
};

// Functions -------------------------------------------------------------------

function create(bindings) {
  const handler = handle(bindings);
  window.addEventListener('keydown', handler);

  return handler;
}

function destroy(handler) {
  window.removeEventListener('keydown', handler);
}

function handle(bindings) {
  return event => {
    const binding = bindings.find(b =>
      b.key.keyCode === event.keyCode && b.key.shiftKey === event.shiftKey
    );

    if (binding && binding.hasOwnProperty('action')) binding.action();
  };
}
