import Action from 'data/Action';
import Carl from 'entities/Carl';
import DOM from 'DOM';
import DefaultWorld from 'worlds/Default';
import Direction from 'data/Direction';
import Entity from 'Entity';
import Move from 'components/Move';
import MovementSystem from 'systems/Movement';
import renderField from 'views/field';
import renderMessage from 'views/message';
import renderStatus from 'views/status';

// Data ------------------------------------------------------------------------

// Exports ---------------------------------------------------------------------

export default {
  init
};

// Functions -------------------------------------------------------------------

function getInitialModel() {
  const worldHeight = 768;
  const worldWidth = 1024;
  const world = DefaultWorld.generate(worldWidth, worldHeight);
  const carlPos = DefaultWorld.startingPosition(world);

  return {
    state: {
      entities: DefaultWorld.populate(world).concat(Carl.create(carlPos)),
      messages: [],
      worldHeight,
      worldWidth
    },
    world
  };
}

function init() {
  let model = getInitialModel();

  resizeField(window.innerWidth, window.innerHeight);
  renderView(model);

  window.addEventListener('keydown', event => {
    let action;
    switch (event.keyCode) {
      case 77: // KeyM
      case 81: // KeyQ
        return toggleLog();
        break;

      case 39: // ArrowRight
      case 76: // KeyL
        action = Action.MOVE_EAST;
        break;

      case 38: // ArrowUp
      case 75: // KeyK
        action = Action.MOVE_NORTH;
        break;

      case 85: // KeyU
        action = Action.MOVE_NORTHEAST;
        break;

      case 89: // KeyY
        action = Action.MOVE_NORTHWEST;
        break;

      case 40: // ArrowDown
      case 74: // KeyJ
        action = Action.MOVE_SOUTH;
        break;

      case 78: // KeyN
        action = Action.MOVE_SOUTHEAST;
        break;

      case 66: // KeyB
        action = Action.MOVE_SOUTHWEST;
        break;

      case 37: // ArrowLeft
      case 72: // KeyH
        action = Action.MOVE_WEST;
        break;
    }

    if (Boolean(action)) {
      model = update(action, model);
      renderView(model);
    }
  });

  window.addEventListener('resize', () => {
    resizeField(window.innerWidth, window.innerHeight);
    renderView(model);
  });
}

function logMessage(message) {
  const log = DOM.find('#Log');
  const messageP = DOM.html('p', {}, [message]);

  log.insertBefore(messageP, log.firstChild);
}

function renderView(model) {
  renderMessage(model);
  renderField(model);
  renderStatus(model);
}

function resizeField(width, height) {
  const field = DOM.find('#Field');

  field.setAttribute('width', width);
  field.setAttribute('height', height - 80);
}

function toggleLog() {
  const log = DOM.find('#Log');

  if (log.classList.contains('open')) log.classList.remove('open');
  else log.classList.add('open');
}

function update(action, model) {
  let state = model.state;
  let entities = state.entities;
  let carl = Carl.find(state.entities);

  let moveDirection;
  switch (action) {
    case Action.MOVE_EAST: moveDirection = Direction.EAST; break;
    case Action.MOVE_NORTH: moveDirection = Direction.NORTH; break;
    case Action.MOVE_NORTHEAST: moveDirection = Direction.NORTHEAST; break;
    case Action.MOVE_NORTHWEST: moveDirection = Direction.NORTHWEST; break;
    case Action.MOVE_SOUTH: moveDirection = Direction.SOUTH; break;
    case Action.MOVE_SOUTHEAST: moveDirection = Direction.SOUTHEAST; break;
    case Action.MOVE_SOUTHWEST: moveDirection = Direction.SOUTHWEST; break;
    case Action.MOVE_WEST: moveDirection = Direction.WEST; break;
  }

  if (moveDirection) {
    carl = Entity.attach(carl, Move.create(moveDirection));
    entities = Entity.listReplace(entities, Carl.findFn, carl);
  }

  state = Object.assign({}, model.state, { entities, messages: [] });
  // TODO: LogicSystem.run
  state = MovementSystem.run(Object.assign({}, model, { state }));
  // TODO: CombatSystem.run

  state.messages.forEach(message => logMessage(message));

  const newModel = {
    state: Object.assign({}, model.state, state),
    world: model.world
  };

  return newModel;
}
