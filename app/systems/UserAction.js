import Action from 'data/Action';
import Carl from 'entities/Carl';
import DOM from 'DOM';
import Direction from 'data/Direction';
import Entity from 'Entity';
import Focus from 'data/Focus';
import Move from 'components/Move';
import Util from 'Util';
import gameKeyBindings from 'keyBindings/game';
import inventoryKeyBindings from 'keyBindings/inventory';
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

    case Focus.LOG:
      action = boundAction(logKeyBindings, model.state.keydown);
      break;
  }

  let carl = Carl.findIn(model.state.entities);
  let focus = model.state.focus;

  switch (action) {
    case Action.CLOSE_PANELS:
      DOM.find('#Inventory').classList.remove('-open');
      DOM.find('#Log').classList.remove('-open');
      focus = Focus.GAME;
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

    case Action.TOGGLE_INVENTORY:
      focus = togglePanel('Inventory') ? Focus.INVENTORY : Focus.GAME;
      break;

    case Action.TOGGLE_LOG:
      focus = togglePanel('Log') ? Focus.LOG : Focus.GAME;
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
