import { find, html } from 'DOM';

export default function renderMessage(model) {
  const messageEl = html('div', { id: 'Message' }, [model.message]);
  document.body.replaceChild(messageEl, find('#Message'));
}
