import Avatar from 'components/Avatar';
import Energy from 'components/Energy';
import Entity from 'Entity';
import Health from 'components/Health';
import Inventory from 'components/Inventory';
import Position from 'components/Position';
import World from 'World';

// Data ------------------------------------------------------------------------

// Exports ---------------------------------------------------------------------

module.exports = {
  create,
  generate
};

// Functions -------------------------------------------------------------------

function create(position) {
  return Entity.create([
    Avatar.create('e', '#e86b6b'),
    Health.create(100),
    Inventory.create([]),
    Position.create(position.x, position.y)
  ]);
}

function generate(world) {
  return create(World.emptyLandPosition(world));
}
