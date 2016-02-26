import Avatar from 'components/Avatar';
import BackgroundColor from 'components/BackgroundColor';
import Type from 'data/TileType';

// Data ------------------------------------------------------------------------

const Value = Object.assign({
  [Type.CAVE]: {
    avatar: Avatar.create('.', '#753').value,
    backgroundColor: BackgroundColor.create('#642').value
  },

  [Type.LAND]: {
    avatar: Avatar.create('.', '#351').value,
    backgroundColor: BackgroundColor.create('#240').value
  },

  [Type.MOUNTAIN]: {
    avatar: Avatar.create('X', '#555').value,
    backgroundColor: BackgroundColor.create('#444').value
  },

  [Type.WATER]: {
    avatar: Avatar.create('~', '#357').value,
    backgroundColor: BackgroundColor.create('#246').value
  }
});

// Exports ---------------------------------------------------------------------

export default {
  create,
  generateGrid,
  is,
  isCave,
  isLand,
  isMountain,
  isPassable,
  isWater,
  value
};

// Functions -------------------------------------------------------------------

function create({ position, type }) {
  return { position, type };
}

function generateGrid(columns, rows, typeFn) {
  const tiles = [];

  for (let x = 0; x < columns; x++) {
    for (let y = 0; y < rows; y++) {
      tiles.push(create({ position: { x, y }, type: typeFn(x, y) }));
    }
  }

  return tiles;
}

function is(tile, tileType) {
  return tile.type === tileType;
}

function isCave(tile) {
  return is(tile, Type.CAVE);
}

function isLand(tile) {
  return is(tile, Type.LAND);
}

function isMountain(tile) {
  return is(tile, Type.MOUNTAIN);
}

function isPassable(tile) {
  return !is(tile, Type.MOUNTAIN);
}

function isWater(tile) {
  return is(tile, Type.WATER);
}

function value(tile) {
  return Value[tile.type];
}
