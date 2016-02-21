
// Data ------------------------------------------------------------------------

const MOVE = 'MOVE';

const Direction = Object.freeze({
  EAST: 'EAST',
  NORTH: 'NORTH',
  SOUTH: 'SOUTH',
  WEST: 'WEST'
});

// Exports ---------------------------------------------------------------------

module.exports = {
  Direction,
  create,
  type: MOVE
};

// Functions -------------------------------------------------------------------

function create(direction) {
  return {
    type: MOVE,
    value: direction
  };
}

/*
  dest = World.tileTo(world, World.Direction.EAST, carl.position);
  if (Carl.canAffordMoveTo(carl, dest)) {
    carl = Position.moveEast(carl);
    carl = Carl.finishMove(carl, dest);
  }
*/
