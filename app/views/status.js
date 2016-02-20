import Energy from 'components/Energy';
import Entity from 'Entity';
import Health from 'components/Health';
import { find, html, text } from 'DOM';

export default function renderStatus(model) {
  const carlHealth = Entity.get(model.carl, Health.type);
  const carlEnergy = Entity.get(model.carl, Energy.type);

  const statusEl = html('div', { id: 'Status' }, [
    html('span', { class: 'stats' }, [
      `${carlHealth.current}/${carlHealth.max}HP`,
      html('span', { class: 'cpu' }, [
        text('CPU:'),
      ]),
      `?GHz`
    ]),
    html('span', { class: 'energy' }, [
      `${carlEnergy}J (? steps)`
    ])
  ]);
  document.body.replaceChild(statusEl, find('#Status'));
}
