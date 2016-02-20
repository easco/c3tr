import Avatar from 'components/Avatar';
import CPU from 'entities/CPU';
import CPUSlot from 'components/CPUSlot';
import Energy from 'components/Energy';
import Entity from 'Entity';
import Health from 'components/Health';
import Inventory from 'components/Inventory';
import MaxEnergy from 'components/MaxEnergy';
import Position from 'components/Position';

// Data ------------------------------------------------------------------------

// Exports ---------------------------------------------------------------------

module.exports = {
  create
};

// Functions -------------------------------------------------------------------

function create(position) {
  const maxEnergy = 60000;

  return Entity.create([
    Avatar.create('@', '#f8f8f8'),
    CPUSlot.create(CPU.create(1.0)),
    Energy.create(maxEnergy),
    Health.create(100),
    Inventory.create([]),
    MaxEnergy.create(maxEnergy),
    Position.create(position.x, position.y)
  ]);
}
