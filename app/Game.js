import Carl from 'entities/Carl';
import DOM from 'DOM';
import DefaultWorld from 'worlds/Default';
import Focus from 'data/Focus';
import LogSystem from 'systems/Log';
import MovementSystem from 'systems/Movement';
import UserActionSystem from 'systems/UserAction';
import Util from 'Util';
import renderField from 'views/field';
import renderInventory from 'views/inventory';
import renderItems from 'views/items';
import renderMessage from 'views/message';
import renderStatus from 'views/status';

// Exports ---------------------------------------------------------------------

export default {
  init
};

// Functions -------------------------------------------------------------------

function getInitialModel() {
  const worldHeight = 768;
  const worldWidth = 1024;

  const world = Util.logTime('World generation', () =>
    DefaultWorld.generate(worldWidth, worldHeight)
  );

  const entities = Util.logTime('World population', () =>
    DefaultWorld.populate(world)
  );

  const carlPos = DefaultWorld.startingPosition(world, entities);

  return {
    state: {
      entities: entities.concat(Carl.create({ position: carlPos })),
      focus: Focus.GAME,
      keydown: null,
      messages: [],
      worldHeight,
      worldWidth
    },
    world
  };
}

function init() {
  let drawFrame = null;
  let model = getInitialModel();

  function draw() {
    if (drawFrame) window.cancelAnimationFrame(drawFrame);
    drawFrame = window.requestAnimationFrame(renderViews.bind(null, model));
  }

  function handleKey(keydown) {
    window.removeEventListener('keydown', handleKey);
    model = Util.merge(model, { state: Util.merge(model.state, { keydown }) });
    model = update(model);
    renderViews(model);
    window.requestAnimationFrame(() => {
      window.addEventListener('keydown', handleKey);
    });
  }

  window.addEventListener('keydown', handleKey);

  window.addEventListener('resize', () => {
    resizeField(window.innerWidth, window.innerHeight);
    draw();
  });

  resizeField(window.innerWidth, window.innerHeight);
  Util.logTime('Initial render', () => renderViews(model));
}

function renderViews(model) {
  switch (model.state.focus) {
    case Focus.GAME:
      renderField(model);
      break;

    case Focus.INVENTORY:
      renderInventory(model);
      break;

    case Focus.ITEMS:
      renderItems(model);
      break;
  }

  renderMessage(model);
  renderStatus(model);
}

function resizeField(width, height) {
  const field = DOM.find('#Field');

  field.setAttribute('width', width);
  field.setAttribute('height', height - 74);
}

function update(model) {
  model = Util.merge(model, {
    state: Util.merge(model.state, { messages: [] })
  });
  let state = UserActionSystem.run(model);

  if (model.state.focus === Focus.GAME) {
    // state = LogicSystem.run(Util.merge(model, { state }));
    state = MovementSystem.run(Util.merge(model, { state }));
    // state = CombatSystem.run(Util.merge(model, { state }));
  }

  state = LogSystem.run(Util.merge(model, { state }));

  return {
    state: Util.merge(model.state, state),
    world: model.world
  };
}
