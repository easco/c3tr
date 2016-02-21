import { find, html } from 'DOM';

export default function renderMessage({ state }) {
  const messageEl = html('div', { id: 'Message' }, [state.message]);
  document.body.replaceChild(messageEl, find('#Message'));
}
