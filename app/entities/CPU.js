import Avatar from 'components/Avatar';
import ClockSpeed from 'components/ClockSpeed';
import Entity from 'Entity';
import Name from 'components/Name';
import Random from 'Random';

// Data ------------------------------------------------------------------------

// Exports ---------------------------------------------------------------------

export default {
  create,
  generate
};

// Functions -------------------------------------------------------------------

function create(clockSpeed) {
  return Entity.create([
    Avatar.create('#', '#CC6'),
    ClockSpeed.create(clockSpeed),
    Name.create('CPU')
  ]);
}

function generate() {
  return create(Random.float(1, 6).toFixed(1));
}
