import Carl from 'entities/Carl';
import Elevation from 'components/Elevation';
import Entity from 'Entity';
import Position from 'components/Position';
import Random from 'Random';
import Tile from 'entities/Tile';
import World from 'World';
import renderField from 'views/field';
import renderMessage from 'views/message';
import renderStatus from 'views/status';
import { find, html, text } from 'DOM';

// Data ------------------------------------------------------------------------

// Exports ---------------------------------------------------------------------

module.exports = {
  entitiesAt,
  findEntities,
  init
};

// Functions -------------------------------------------------------------------

function entitiesAt(model, position) {
  return findEntities(model, entity => {
    const entityPosition = Entity.get(entity, Position.type);
    return entity.position.x === position.x
      && entity.position.y === position.y;
  });
}

function findEntities(model, fn) {
  return model.entities.filter(fn);
}

function getInitialModel() {
  const world = World.generate(1024, 768);

  const carlPos = randomLandPosition(world);
  const carl = Carl.create(carlPos);

  return {
    carl,
    entities: [carl],
    message: 'You are Carl, a time-traveling robot.',
    world
  };
}

function init() {
  let model = getInitialModel();

  resizeField(window.innerWidth, window.innerHeight);
  renderView(model);

  window.addEventListener('keydown', event => {
    model = update(event.code, model);
    renderView(model);
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
    x = Random.integer(0, world.width);
    y = Random.integer(0, world.height);
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

function update(action, model) {
  // TODO: Define `newModel` based on `action`
  // TODO: `save(newModel);`
  // TODO: `return newModel;`

  return model; // FIXME: Temp
}
