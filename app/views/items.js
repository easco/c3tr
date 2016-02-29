import Carl from 'entities/Carl';
import DOM from 'DOM';
import Entity from 'Entity';
import Position from 'components/Position';

export default function renderItems({ state }) {
  const carlPos = Carl.findIn(state.entities).position;

  const items = state.entities
    .filter(entity =>
      !Entity.is(entity, Carl)
      && Position.match(entity.position, carlPos)
    )
    .map(entity => DOM.html('p', entity.name));

  const itemsDiv = DOM.html('div#Items.-open', items);

  document.body.replaceChild(itemsDiv, DOM.find('#Items'));
}
