import Carl from 'entities/Carl';
import DOM from 'DOM';

export default function renderInventory({ state }) {
  const items = Carl.findIn(state.entities).inventory
    .map(item => DOM.html('p', item.name));

  const inventoryEl = DOM.html('div#Inventory', items);

  document.body.replaceChild(inventoryEl, DOM.find('#Inventory'));
}
