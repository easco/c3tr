import Carl from 'entities/Carl';
import Elevation from 'components/Elevation';
import Entity from 'Entity';
import Monster from 'entities/Monster';
import Position from 'components/Position';
import Random from 'Random';
import Tile from 'Tile';
import World from 'World';
import renderField from 'views/field';
import renderMessage from 'views/message';
import renderStatus from 'views/status';
import { find, html, text } from 'DOM';

// Data ------------------------------------------------------------------------

const CarlAction = Object.freeze({
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
      carl: Carl.create(carlPos),
      entities: getInitialEntities(world, 5000),
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
        action = CarlAction.MOVE_EAST;
        break;

      case 38: // ArrowUp
      case 75: // KeyK
        action = CarlAction.MOVE_NORTH;
        break;

      case 40: // ArrowDown
      case 74: // KeyJ
        action = CarlAction.MOVE_SOUTH;
        break;

      case 37: // ArrowLeft
      case 72: // KeyH
        action = CarlAction.MOVE_WEST;
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

    if (Elevation.isLand(tile)) {
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

function update(action, { state, world }) {
  let carl = state.carl;
  let dest;
  switch (action) {
    case CarlAction.MOVE_EAST:
      dest = World.tileTo(world, World.Direction.EAST, carl.position);
      if (Carl.canAffordMoveTo(carl, dest)) {
        carl = Position.moveEast(carl);
        carl = Carl.finishMove(carl, dest);
      }
      break;

    case CarlAction.MOVE_NORTH:
      dest = World.tileTo(world, World.Direction.NORTH, carl.position);
      if (Carl.canAffordMoveTo(carl, dest)) {
        carl = Position.moveNorth(carl);
        carl = Carl.finishMove(carl, dest);
      }
      break;

    case CarlAction.MOVE_SOUTH:
      dest = World.tileTo(world, World.Direction.SOUTH, carl.position);
      if (Carl.canAffordMoveTo(carl, dest)) {
        carl = Position.moveSouth(carl);
        carl = Carl.finishMove(carl, dest);
      }
      break;

    case CarlAction.MOVE_WEST:
      dest = World.tileTo(world, World.Direction.WEST, carl.position);
      if (Carl.canAffordMoveTo(carl, dest)) {
        carl = Position.moveWest(carl);
        carl = Carl.finishMove(carl, dest);
      }
      break;
  }

  // TODO: Entities with Logic make decisions based on `model`

  // TODO: Combat round(s)

  const newModel = {
    state: Object.assign({}, state, {
      carl
    }),
    world
  };

  // TODO: save(newModel);

  return newModel;
}
