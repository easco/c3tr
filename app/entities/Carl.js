import Avatar from 'components/Avatar';
import CPU from 'entities/CPU';
import CPUSlot from 'components/CPUSlot';
import Energy from 'components/Energy';
import Entity from 'Entity';
import Health from 'components/Health';
import Inventory from 'components/Inventory';
import Position from 'components/Position';
import Tile from 'Tile';

// Data ------------------------------------------------------------------------

// Exports ---------------------------------------------------------------------

module.exports = {
  create,
  finishMove
};

// Functions -------------------------------------------------------------------

function create(position) {
  return Entity.create([
    Avatar.create('@', '#f8f8f8'),
    CPUSlot.create(CPU.create(1.0)),
    Energy.create(10000),
    Health.create(100),
    Inventory.create([]),
    Position.create(position.x, position.y)
  ]);
}

function finishMove(carl, tile) {
  const energyCost = Tile.isLand(tile) ? 10 : 1000;

  return Energy.drain(carl, energyCost);
}
