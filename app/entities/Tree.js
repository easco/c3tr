import Avatar from 'components/Avatar';
import Collision from 'components/Collision';
import Entity from 'Entity';
import Name from 'components/Name';
import Position from 'components/Position';

// Data ------------------------------------------------------------------------

const TREE = 'Tree';

// Exports ---------------------------------------------------------------------

export default {
  create,
  type: TREE
};

// Functions -------------------------------------------------------------------

function create({ position }) {
  return Entity.create(TREE, [
    Avatar.create('▲', '#573'),
    Collision.create(),
    Name.create('tree'),
    Position.create(position.x, position.y)
  ]);
}
