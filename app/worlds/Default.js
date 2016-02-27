import Battery from 'entities/Battery';
import CPU from 'entities/CPU';
import FSN from 'fast-simplex-noise';
import Monster from 'entities/Monster';
import Random from 'Random';
import Tile from 'Tile';
import TileType from 'data/TileType';
import Util from 'Util';
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

function populate(world) {
  return Util.compose([], [
    e => World.placeEntity(world, e, Monster, Random.integer(3000, 4000)),
    e => World.placeEntity(world, e, Battery, Random.integer(150, 250)),
    e => World.placeEntity(world, e, CPU, Random.integer(10, 50))
  ]);
}

function startingPosition(world, entities) {
  return World.randomEmptyPosition(world, entities, [TileType.LAND]);
}
