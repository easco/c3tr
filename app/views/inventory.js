import Carl from 'entities/Carl';
import DOM from 'DOM';
import Focus from 'data/Focus';

export default function renderInventory({ state }) {
  const items = Carl.findIn(state.entities).inventory
    .map(item => DOM.html('p', item.name));

  const content = DOM.html('div.content', items);

  DOM.find('#Inventory').replaceChild(content, DOM.find('#Inventory .content'));
}
