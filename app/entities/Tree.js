import Collision from 'components/Collision';
import Entity from 'Entity';

// Exports ---------------------------------------------------------------------

export default {
  create
};

// Functions -------------------------------------------------------------------

function create({ position }) {
  return Entity.create([
    Avatar.create('*', '#8A6'),
    Collision.create(),
    Position.create(position)
  ]);
}
