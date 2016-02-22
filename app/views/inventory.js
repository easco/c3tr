import DOM from 'DOM';

export default function renderInventory({ state }) {
  const inventoryEl = DOM.html(
    'div',
    { id: 'Inventory' },
    state.entities
      .find(entity => entity.id === 'CARL')
      .inventory
      .map(item => DOM.html('p', item.name))
  );

  document.body.replaceChild(inventoryEl, DOM.find('#Inventory'));
}
