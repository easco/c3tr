import Character from 'components/Character';
import Energy from 'components/Energy';
import Entity from 'Entity';
import Health from 'components/Health';
import Inventory from 'components/Inventory';
import Position from 'components/Position';

// Data ------------------------------------------------------------------------

// Exports ---------------------------------------------------------------------

module.exports = {
  create
};

// Functions -------------------------------------------------------------------

function create() {
  return Entity.create([
    Character.create('@'),
    Energy.create(60000),
    Health.create(100),
    Inventory.create([]),
    Position.create()
  ]);
}
