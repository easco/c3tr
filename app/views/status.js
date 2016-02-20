import Entity from 'Entity';
import Format from 'Format';
import { find, html, text } from 'DOM';

export default function renderStatus(model) {
  const carl = Entity.properties(model.carl);
  const cpu = Entity.properties(carl.cpuSlot.cpu);

  // FIXME: This value should factor in Carl's equipment
  const numSteps = Math.floor(carl.energy / 20);

  const statusEl = html('div', { id: 'Status' }, [
    html('span', { class: 'stats' }, [
      `${carl.health.current}/${carl.health.max}HP`,
      html('span', { class: 'cpu' }, [
        text('CPU:'),
      ]),
      `${cpu.clockSpeed.toFixed(1)}GHz`
    ]),
    html('span', { class: 'energy' }, [
      `${Format.number(carl.energy)}J (${Format.number(numSteps)} steps)`
    ])
  ]);
  document.body.replaceChild(statusEl, find('#Status'));
}
