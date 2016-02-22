import Avatar from 'components/Avatar';
import Energy from 'components/Energy';
import Entity from 'Entity';
import Health from 'components/Health';
import Inventory from 'components/Inventory';
import Logic from 'components/Logic';
import Name from 'components/Name';
import Position from 'components/Position';
import World from 'World';

// Data ------------------------------------------------------------------------

// Exports ---------------------------------------------------------------------

module.exports = {
  create
};

// Functions -------------------------------------------------------------------

function create(position) {
  return Entity.create([
    Avatar.create('m', '#e86b6b'),
    Health.create(100),
    Inventory.create([]),
    Logic.create(Logic.Mode.HOSTILE),
    Name.create('monster'),
    Position.create(position.x, position.y)
  ]);
}
