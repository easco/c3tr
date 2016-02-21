import Entity from 'Entity';
import Format from 'Format';
import { find, html, text } from 'DOM';

export default function renderStatus(model) {
  const carl = model.carl;

  const energySpan = html('span', { class: 'energy' });
  energySpan.style.width = `${100 * carl.energy.current / carl.energy.max}%`;

  const statusEl = html('div', { id: 'Status' }, [
    html('span', { class: 'stats' }, [
      `${carl.health.current}/${carl.health.max}HP`,
      html('span', { class: 'cpu' }, [
        text('CPU:'),
      ]),
      `${carl.cpuSlot.cpu.clockSpeed.toFixed(1)}GHz`
    ]),
    html('span', { class: 'energy-bar' }, [energySpan])
  ]);
  document.body.replaceChild(statusEl, find('#Status'));
}
