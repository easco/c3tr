import Carl from 'entities/Carl';
import DOM from 'DOM';

export default function renderStatus({ state }) {
  const carl = Carl.findIn(state.entities);

  const energySpan = DOM.html('span.energy');
  const energyLevel = 100 * carl.energy.current / carl.energy.max;
  energySpan.style.width = `${energyLevel}%`;
  if (energyLevel < 20) energySpan.classList.add('-critical');
  else if (energyLevel < 50) energySpan.classList.add('-low');

  const statusEl = DOM.html('div#Status', [
    DOM.html('span.stats', [
      `${carl.health.current}/${carl.health.max}HP`,
      DOM.html('span.stat', [
        `CPU: ${carl.cpuSlot.cpu.clockSpeed.toFixed(1)}GHz`
      ]),
      DOM.html('span.stat', [
        `(${carl.position.x + 1}, ${carl.position.y + 1})`
      ])
    ]),
    DOM.html('span.energy-bar', [energySpan])
  ]);
  document.body.replaceChild(statusEl, DOM.find('#Status'));
}
