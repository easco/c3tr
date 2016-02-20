import Entity from 'Entity';
import Format from 'Format';
import { find, html, text } from 'DOM';

export default function renderStatus(model) {
  const carl = Entity.properties(model.carl);
  const cpu = Entity.properties(carl.cpuSlot.cpu);

  const energySpan = html('span', { class: 'energy' });
  energySpan.style.width = `${100 * carl.energy / carl.maxEnergy}%`;

  const statusEl = html('div', { id: 'Status' }, [
    html('span', { class: 'stats' }, [
      `${carl.health.current}/${carl.health.max}HP`,
      html('span', { class: 'cpu' }, [
        text('CPU:'),
      ]),
      `${cpu.clockSpeed.toFixed(1)}GHz`
    ]),
    html('span', { class: 'energy-bar' }, [energySpan])
  ]);
  document.body.replaceChild(statusEl, find('#Status'));
}
