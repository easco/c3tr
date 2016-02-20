import Character from 'components/Character';
import Entity from 'Entity';
import Health from 'components/Health';
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
    Health.create(100),
    Position.create()
  ]);
}
