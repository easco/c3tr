import Battery from 'entities/Battery';
import FSN from 'fast-simplex-noise';
import Monster from 'entities/Monster';
import Random from 'Random';
import Tile from 'Tile';
import TileType from 'data/TileType';
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
  const caveGen = new FSN({ frequency: 0.05, octaves: 6 });
  const mountainGen = new FSN({ frequency: 0.01, octaves: 12 });
  const terrainGen = new FSN({ frequency: 0.008, octaves: 8 });

  const cave = (x, y) => Math.abs(caveGen.cylindrical2D(width, x, y));
  const mountain = (x, y) => mountainGen.cylindrical2D(width, x, y);
  const terrain = (x, y) => terrainGen.cylindrical2D(width, x, y);

  const tiles = Tile.generateGrid(width, height, (x, y) => {
    const t = terrain(x, y);

    if (t > 0.15) {
      if (t > 0.3 && mountain(x, y) > 0.3) {
        return cave(x, y) < 0.08 ? TileType.CAVE : TileType.MOUNTAIN;
      }

      return TileType.LAND;
    }

    return TileType.WATER;
  });

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
