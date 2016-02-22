import Avatar from 'components/Avatar';
import ClockSpeed from 'components/ClockSpeed';
import Entity from 'Entity';
import Name from 'components/Name';
import Random from 'Random';

// Data ------------------------------------------------------------------------

const CPU = 'CPU';

// Exports ---------------------------------------------------------------------

export default {
  create,
  generate,
  type: CPU
};

// Functions -------------------------------------------------------------------

function create(clockSpeed) {
  return Entity.create(CPU, [
    Avatar.create('#', '#CC6'),
    ClockSpeed.create(clockSpeed),
    Name.create('CPU')
  ]);
}

function generate() {
  return create(Random.float(1, 6).toFixed(1));
}
