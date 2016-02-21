import Carl from 'entities/Carl';
import CombatSystem from 'systems/Combat';
import Entity from 'Entity';
import LogicSystem from 'systems/Logic';
import Monster from 'entities/Monster';
import Move from 'components/Move';
import MovementSystem from 'systems/Movement';
import Position from 'components/Position';
import Random from 'Random';
import Tile from 'Tile';
import World from 'World';
import renderField from 'views/field';
import renderMessage from 'views/message';
import renderStatus from 'views/status';
import { find, html, text } from 'DOM';

// Data ------------------------------------------------------------------------

const Action = Object.freeze({
  MOVE_EAST: 'MOVE_EAST',
  MOVE_NORTH: 'MOVE_NORTH',
  MOVE_SOUTH: 'MOVE_SOUTH',
  MOVE_WEST: 'MOVE_WEST'
});

// Exports ---------------------------------------------------------------------

module.exports = {
  init
};

// Functions -------------------------------------------------------------------

function getInitialEntities(world, count) {
  const types = [Monster];
  let entityPos, entities = [];

  for (let i = 0; i < count; i++) {
    entityPos = randomLandPosition(world);
    entities = entities.concat(Random.from(types).create(entityPos));
  }

  return entities;
}

function getInitialModel() {
  const worldHeight = 768;
  const worldWidth = 1024;
  const world = World.generate(worldWidth, worldHeight); // TODO: Pass seed
  const carlPos = randomLandPosition(world);

  return {
    state: {
      entities: getInitialEntities(world, 5000)
        .concat(Carl.create(carlPos)),
      message: 'You are Carl, a time-traveling robot.',
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
      case 39: // ArrowRight
      case 76: // KeyL
        action = Action.MOVE_EAST;
        break;

      case 38: // ArrowUp
      case 75: // KeyK
        action = Action.MOVE_NORTH;
        break;

      case 40: // ArrowDown
      case 74: // KeyJ
        action = Action.MOVE_SOUTH;
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

function load() {
  return JSON.parse(localStorage.getItem('state'));
}

function randomLandPosition(world) {
  let tile, x, y;
  while (true) {
    x = Random.integer(0, world.width - 1);
    y = Random.integer(0, world.height - 1);
    tile = world.tiles[x][y];

    if (Tile.isLand(tile)) {
      return { x, y };
    }
  }
}

function renderView(model) {
  renderMessage(model);
  renderField(model);
  renderStatus(model);
}

function resizeField(width, height) {
  const field = find('#Field');

  field.setAttribute('width', width);
  field.setAttribute('height', height - 80);
}

function save(state) {
  localStorage.setItem('state', JSON.stringify(state));
}

function update(action, model) {
  let state = model.state;
  let entities = state.entities;
  let carl = Carl.find(state.entities);

  switch (action) {
    case Action.MOVE_EAST:
      carl = Entity.attach(carl, Move.create(Move.Direction.EAST));
      entities = Entity.listReplace(entities, Carl.findFn, carl);
      break;

    case Action.MOVE_NORTH:
      carl = Entity.attach(carl, Move.create(Move.Direction.NORTH));
      entities = Entity.listReplace(entities, Carl.findFn, carl);
      break;

    case Action.MOVE_SOUTH:
      carl = Entity.attach(carl, Move.create(Move.Direction.SOUTH));
      entities = Entity.listReplace(entities, Carl.findFn, carl);
      break;

    case Action.MOVE_WEST:
      carl = Entity.attach(carl, Move.create(Move.Direction.WEST));
      entities = Entity.listReplace(entities, Carl.findFn, carl);
      break;
  }

  state = Object.assign({}, model.state, { entities });
  state = LogicSystem.run(Object.assign({}, model, { state }));
  state = MovementSystem.run(Object.assign({}, model, { state }));
  state = CombatSystem.run(Object.assign({}, model, { state }));

  const newModel = {
    state: Object.assign({}, model.state, state),
    world: model.world
  };

  // TODO: save(newModel);

  return newModel;
}
