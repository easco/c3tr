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

function create(type) {
  return type;
}

function generateGrid(columns, rows, typeFn) {
  const tiles = new Array(columns);
  for (let x = 0; x < columns; x++) {
    tiles[x] = new Array(rows);
    for (let y = 0; y < rows; y++) {
      tiles[x][y] = create(typeFn(x, y));
    }
  }

  return tiles;
}

function is(tile, tileType) {
  return tile === tileType;
}

function isCave(tile) {
  return tile === Type.CAVE;
}

function isLand(tile) {
  return tile === Type.LAND;
}

function isMountain(tile) {
  return tile === Type.MOUNTAIN;
}

function isPassable(tile) {
  return tile !== Type.MOUNTAIN;
}

function isWater(tile) {
  return tile === Type.WATER;
}

function value(tile) {
  return Value[tile];
}
