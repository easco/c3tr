import Carl from 'entities/Carl';
import DOM from 'DOM';
import Focus from 'data/Focus';

export default function renderInventory({ state }) {
  const items = Carl.findIn(state.entities).inventory
    .map(item => DOM.html('p', item.name));

  const inventoryEl = DOM.html('div#Inventory', {
    'class': state.focus === Focus.INVENTORY ? '-open' : ''
  }, items);

  document.body.replaceChild(inventoryEl, DOM.find('#Inventory'));
}
