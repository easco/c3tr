import Avatar from 'components/Avatar';
import Energy from 'components/Energy';
import Entity from 'Entity';
import Name from 'components/Name';
import Position from 'components/Position';
import Random from 'Random';

// Data ------------------------------------------------------------------------

const BATTERY = 'BATTERY';

// Exports ---------------------------------------------------------------------

export default {
  create,
  generate,
  type: BATTERY
};

// Functions -------------------------------------------------------------------

function create(level, position = null) {
  let battery = [
    Avatar.create('%', '#E6E69C'),
    Energy.create(level),
    Name.create('battery')
  ];

  if (position) {
    battery.push(Position.create(position.x, position.y));
  }

  return Entity.create(battery);
}

function generate(position = null) {
  return create(Random.integer(600, 1800), position);
}
