import Avatar from 'components/Avatar';
import Energy from 'components/Energy';
import Entity from 'Entity';
import Name from 'components/Name';
import Position from 'components/Position';
import Random from 'Random';

// Data ------------------------------------------------------------------------

const BATTERY = 'Battery';

// Exports ---------------------------------------------------------------------

export default {
  create,
  type: BATTERY
};

// Functions -------------------------------------------------------------------

function create({ level, position }) {
  let battery = [
    Avatar.create('⍠', '#9DD'),
    Energy.create(level || Random.integer(600, 1800)),
    Name.create('battery')
  ];

  if (position) {
    battery.push(Position.create(position.x, position.y));
  }

  return Entity.create(BATTERY, battery);
}
