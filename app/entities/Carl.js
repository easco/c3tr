import Avatar from 'components/Avatar';
import CPU from 'entities/CPU';
import CPUSlot from 'components/CPUSlot';
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
    Avatar.create('@', '#f8f8f8'),
    CPUSlot.create(CPU.create(1.0)),
    Energy.create(60000),
    Health.create(100),
    Inventory.create([]),
    Position.create()
  ]);
}
