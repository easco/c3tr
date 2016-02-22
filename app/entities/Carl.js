import Avatar from 'components/Avatar';
import CPU from 'entities/CPU';
import CPUSlot from 'components/CPUSlot';
import Energy from 'components/Energy';
import Entity from 'Entity';
import Health from 'components/Health';
import ID from 'components/ID';
import Inventory from 'components/Inventory';
import MoveAction from 'components/MoveAction';
import MoveRestriction from 'components/MoveRestriction';
import Name from 'components/Name';
import Position from 'components/Position';
import Tile from 'Tile';
import Suckle from 'components/Suckle';

// Data ------------------------------------------------------------------------

const CARL = 'Carl';

// Exports ---------------------------------------------------------------------

export default {
  create,
  findIn,
  type: CARL
};

// Functions -------------------------------------------------------------------

function canAffordMoveTo(tile) {
  if (!Boolean(tile)) return false;
  return this.energy.current >= moveCost(tile);
}

function create(position) {
  return Entity.create(CARL, [
    Avatar.create('@', '#f8f8f8', 100),
    CPUSlot.create(CPU.create(1.0)),
    Energy.create(6000),
    Health.create(100),
    ID.create('CARL'),
    Inventory.create(),
    MoveAction.create(drainEnergyFromMoveTo),
    MoveRestriction.create(canAffordMoveTo),
    Name.create('Carl'),
    Position.create(position.x, position.y),
    Suckle.create(suckleFn)
  ]);
}

function drainEnergyFromMoveTo(tile) {
  return Energy.drain(this, moveCost(tile));
}

function findIn(entities) {
  return entities.find(e => e.id === 'CARL');
}

function moveCost(tile) {
  return Tile.isLand(tile) ? 10 : 100;
}

function suckleFn(battery) {
  return Energy.fill(this, battery.energy.current);
}
