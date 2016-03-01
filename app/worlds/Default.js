import Battery from 'entities/Battery';
import CPU from 'entities/CPU';
import FSN from 'fast-simplex-noise';
import Monster from 'entities/Monster';
import Random from 'Random';
import Tile from 'Tile';
import TileType from 'data/TileType';
import Tree from 'entities/Tree';
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
  const terrainGen = new FSN({ frequency: 0.01, octaves: 8 });

  const cave = (x, y) => Math.abs(caveGen.cylindrical2D(width, x, y));
  const mountain = (x, y) => mountainGen.cylindrical2D(width, x, y);
  const terrain = (x, y) => terrainGen.cylindrical2D(width, x, y);

  const tiles = Tile.generateGrid(width, height, (x, y) => {
    const t = terrain(x, y);

    if (t > 0.15) {
      if (t > 0.3 && mountain(x, y) > 0.3) {
        return cave(x, y) < 0.1 ? TileType.CAVE : TileType.MOUNTAIN;
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
  const place = (entity, count) => {
    return entities => (
      World.placeEntity(world, entities, [TileType.LAND], entity, count)
    );
  };

  return Util.pipe([], [
    place(Battery, Random.integer(150, 250)),
    place(CPU, Random.integer(10, 50)),
    place(Monster, Random.integer(1000, 2000)),
    place(Tree, Random.integer(3000, 4000))
  ]);
}

function startingPosition(world, entities) {
  return World.randomEmptyPosition(world, entities, [TileType.LAND]);
}
