import DOM from 'DOM';

export default function renderMessage(model) {
  const messages = model.state.messages;

  const messageEl = DOM.html('div', { id: 'Message' }, [
    messages.length > 0
    ? messages[messages.length - 1].text
    : DOM.html('p', {})
  ]);

  document.body.replaceChild(messageEl, DOM.find('#Message'));
}
