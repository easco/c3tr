import Carl from 'entities/Carl';
import Entity from 'Entity';
import Format from 'Format';
import DOM from 'DOM';

export default function renderStatus({ state }) {
  const carl = Carl.find(state.entities);

  const energySpan = DOM.html('span', { class: 'energy' });
  energySpan.style.width = `${100 * carl.energy.current / carl.energy.max}%`;

  const statusEl = DOM.html('div', { id: 'Status' }, [
    DOM.html('span', { class: 'stats' }, [
      `${carl.health.current}/${carl.health.max}HP`,
      DOM.html('span', { class: 'cpu' }, ['CPU:']),
      `${carl.cpuSlot.cpu.clockSpeed.toFixed(1)}GHz`
    ]),
    DOM.html('span', { class: 'energy-bar' }, [energySpan])
  ]);
  document.body.replaceChild(statusEl, DOM.find('#Status'));
}
