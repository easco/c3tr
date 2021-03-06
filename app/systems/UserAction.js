import Action from 'data/Action';
import Carl from 'entities/Carl';
import DOM from 'DOM';
import Direction from 'data/Direction';
import Entity from 'Entity';
import Focus from 'data/Focus';
import Move from 'components/Move';
import Position from 'components/Position';
import Util from 'Util';
import gameKeyBindings from 'keyBindings/game';
import inventoryKeyBindings from 'keyBindings/inventory';
import itemsKeyBindings from 'keyBindings/items';
import logKeyBindings from 'keyBindings/log';

// Exports ---------------------------------------------------------------------

export default {
  run
};

// Functions -------------------------------------------------------------------

function boundAction(bindings, keydown) {
  const binding = bindings.find(b =>
    b.key.code === keydown.keyCode && b.key.shiftKey === keydown.shiftKey
  );

  return binding ? binding.action : null;
}

function move(carl, direction) {
  return Entity.attach(carl, Move.create(direction));
}

function run(model) {
  if (!model.state.keydown) return model.state;

  let action;
  switch (model.state.focus) {
    case Focus.GAME:
      action = boundAction(gameKeyBindings, model.state.keydown);
      break;

    case Focus.INVENTORY:
      action = boundAction(inventoryKeyBindings, model.state.keydown);
      break;

    case Focus.ITEMS:
      action = boundAction(itemsKeyBindings, model.state.keydown);
      break;

    case Focus.LOG:
      action = boundAction(logKeyBindings, model.state.keydown);
      break;
  }

  let carl = Carl.findIn(model.state.entities);
  let focus = model.state.focus;

  switch (action) {
    case Action.FOCUS_GAME:
      DOM.find('#Inventory').classList.remove('-open');
      DOM.find('#Items').classList.remove('-open');
      DOM.find('#Log').classList.remove('-open');
      focus = Focus.GAME;
      break;

    case Action.FOCUS_INVENTORY:
      DOM.find('#Inventory').classList.add('-open');
      focus = Focus.INVENTORY;
      break;

    case Action.FOCUS_ITEMS:
      if (model.state.entities.filter(e =>
        e.position && !Entity.is(e, Carl)
        && Position.match(e.position, carl.position)
      ).length > 0) {
        focus = togglePanel('Items') ? Focus.ITEMS : Focus.GAME;
      }
      DOM.find('#Items').classList.add('-open');
      focus = Focus.ITEMS;
      break;

    case Action.FOCUS_LOG:
      DOM.find('#Log').classList.add('-open');
      focus = Focus.LOG;
      break;

    case Action.MOVE_EAST:
      carl = move(carl, Direction.EAST);
      break;

    case Action.MOVE_NORTH:
      carl = move(carl, Direction.NORTH);
      break;

    case Action.MOVE_NORTHEAST:
      carl = move(carl, Direction.NORTHEAST);
      break;

    case Action.MOVE_NORTHWEST:
      carl = move(carl, Direction.NORTHWEST);
      break;

    case Action.MOVE_SOUTH:
      carl = move(carl, Direction.SOUTH);
      break;

    case Action.MOVE_SOUTHEAST:
      carl = move(carl, Direction.SOUTHEAST);
      break;

    case Action.MOVE_SOUTHWEST:
      carl = move(carl, Direction.SOUTHWEST);
      break;

    case Action.MOVE_WEST:
      carl = move(carl, Direction.WEST);
      break;
  }

  return Util.merge(model.state, {
    entities: model.state.entities.map(e => Entity.is(e, Carl) ? carl : e),
    focus,
    keydown: null
  });
}

function togglePanel(id) {
  const panel = DOM.find(`#${id}`);

  if (panel.classList.contains('-open')) {
    panel.classList.remove('-open');
    return false;
  }

  panel.classList.add('-open');
  return true;
}
