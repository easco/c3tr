import Avatar from 'components/Avatar';
import BackgroundColor from 'components/BackgroundColor';
import TileType from 'data/TileType';

// Data ------------------------------------------------------------------------

const Value = Object.assign({
  [TileType.CAVE]: {
    avatar: Avatar.create('.', '#753').value,
    backgroundColor: BackgroundColor.create('#642').value
  },

  [TileType.ICE]: {
    avatar: Avatar.create('#', '#9BD').value,
    backgroundColor: BackgroundColor.create('#8AC').value
  },

  [TileType.LAND]: {
    avatar: Avatar.create('.', '#351').value,
    backgroundColor: BackgroundColor.create('#240').value
  },

  [TileType.LAVA]: {
    avatar: Avatar.create('~', '#B55').value,
    backgroundColor: BackgroundColor.create('#A44').value
  },

  [TileType.MOUNTAIN]: {
    avatar: Avatar.create('X', '#555').value,
    backgroundColor: BackgroundColor.create('#444').value
  },

  [TileType.WATER]: {
    avatar: Avatar.create('~', '#357').value,
    backgroundColor: BackgroundColor.create('#246').value
  }
});

// Exports ---------------------------------------------------------------------

export default {
  generateGrid,
  is,
  isLand,
  isPassable,
  typeString,
  value
};

// Functions -------------------------------------------------------------------

function generateGrid(columns, rows, typeFn) {
  const tiles = new Array(columns);

  for (let x = 0; x < columns; x++) {
    tiles[x] = new Uint8Array(rows);
    for (let y = 0; y < rows; y++) {
      tiles[x][y] = typeFn(x, y);
    }
  }

  return tiles;
}

function is(tile, tileType) {
  return tile === tileType;
}

function isLand(tile) {
  return is(tile, TileType.LAND);
}

function isPassable(tile) {
  return !is(tile, TileType.LAVA) && !is(tile, TileType.MOUNTAIN);
}

function typeString(tile) {
  switch (tile) {
    case TileType.CAVE: return 'Cave';
    case TileType.ICE: return 'Ice';
    case TileType.LAND: return 'Land';
    case TileType.LAVA: return 'Lava';
    case TileType.MOUNTAIN: return 'Mountain';
    case TileType.WATER: return 'Water';
    default: return '';
  }
}

function value(tile) {
  return Value[tile];
}
