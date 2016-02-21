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

function create(level, position = null) {
  let battery = [
    Avatar.create('%', '#ff0'),
    Energy.create(level)
  ];

  if (position) {
    battery.push(Position.create(position.x, position.y));
  }

  return Entity.create(battery);
}

function generate() {
  return create(Random.integer(5000, 25000));
}
