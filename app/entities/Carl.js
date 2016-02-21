import Avatar from 'components/Avatar';
import CPU from 'entities/CPU';
import CPUSlot from 'components/CPUSlot';
import Energy from 'components/Energy';
import Entity from 'Entity';
import Health from 'components/Health';
import ID from 'components/ID';
import Inventory from 'components/Inventory';
import MoveEvent from 'components/MoveEvent';
import MoveRestriction from 'components/MoveRestriction';
import Position from 'components/Position';
import Tile from 'Tile';

// Data ------------------------------------------------------------------------

// Exports ---------------------------------------------------------------------

module.exports = {
  create,
  find,
  findFn,
  finishMove
};

// Functions -------------------------------------------------------------------

function canAffordMoveTo(carl, tile) {
  if (!Boolean(tile)) return false;
  return carl.energy.current >= moveCost(tile);
}

function create(position) {
  return Entity.create([
    Avatar.create('@', '#f8f8f8'),
    CPUSlot.create(CPU.create(1.0)),
    Energy.create(6000),
    Health.create(100),
    ID.create('CARL'),
    Inventory.create([]),
    MoveEvent.create(finishMove),
    MoveRestriction.create(canAffordMoveTo),
    Position.create(position.x, position.y)
  ]);
}

function find(entities) {
  return entities.find(findFn);
}

function findFn(entity) {
  return entity.id === 'CARL';
}

function finishMove(carl, tile) {
  return Energy.drain(carl, moveCost(tile));
}

function moveCost(tile) {
  return Tile.isLand(tile) ? 10 : 100;
}
