import Avatar from 'components/Avatar';
import Energy from 'components/Energy';
import Entity from 'Entity';
import Position from 'components/Position';
import Random from 'Random';

// Data ------------------------------------------------------------------------

// Exports ---------------------------------------------------------------------

module.exports = {
  create,
  generate
};

// Functions -------------------------------------------------------------------

function create(level) {
  return Entity.create([
    Avatar.create('%', '#ff0'),
    Energy.create(level),
    Position.create(1,1) //@TODO: randomize this
  ]);
}

function generate() {
  return create(Random.integer(5000, 25000));
}
