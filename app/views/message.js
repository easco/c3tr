import { find, html } from 'DOM';

export default function renderMessage(model) {
  const messages = model.state.messages;

  const messageEl = html('div', { id: 'Message' }, [
    messages.length > 0
    ? messages[messages.length - 1]
    : html('p', {})
  ]);

  document.body.replaceChild(messageEl, find('#Message'));
}
