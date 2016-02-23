import Battery from 'entities/Battery';
import FastSimplexNoise from 'fast-simplex-noise';
import Monster from 'entities/Monster';
import Random from 'Random';
import Tile from 'Tile';
import World from 'World';

// Data -----------------------------------------------------------------------

// Exports --------------------------------------------------------------------

export default {
  generate,
  populate,
  startingPosition
};

// Functions ------------------------------------------------------------------

function generate(width, height) {
  const elevationNoise = new FastSimplexNoise({
    frequency: 0.03,
    max: 10,
    min: -10,
    octaves: 8
  });

  const tiles = new Array(width);
  for (let x = 0; x < width; x++) {
    tiles[x] = new Array(height);
    for (let y = 0; y < height; y++) {
      tiles[x][y] = Tile.create(elevationNoise.cylindrical2D(width, x, y));
    }
  }

  return {
    height,
    tiles,
    width
  };
}

function populate(world, count = 5000) {
  const types = [
    {
      type: Monster,
      weight: 3
    },
    {
      type: Battery,
      weight: 1
    }
  ];
  let entityPos, entities = [], type, weightedTypes = [];

  types.forEach(item => {
    for (let i = 0; i < item.weight; i++) {
      weightedTypes = [].concat.call(weightedTypes, item.type);
    }
  });

  for (let i = 0; i < count; i++) {
    entityPos = World.randomLandPosition(world);
    type = Random.from(weightedTypes);

    switch (type) {
      case Monster:
        entities = entities.concat(Monster.create(entityPos));
        break;
      case Battery:
        entities = entities.concat(Battery.generate(entityPos));
        break;
    }
  }

  return entities;
}

function startingPosition(world) {
  return World.randomLandPosition(world);
}
