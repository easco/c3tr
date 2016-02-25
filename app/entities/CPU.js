import Avatar from 'components/Avatar';
import ClockSpeed from 'components/ClockSpeed';
import Entity from 'Entity';
import Name from 'components/Name';
import Position from 'components/Position';
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

function create({ clockSpeed, position }) {
  let cpu = Entity.create(CPU, [
    Avatar.create('¤', '#CC6'),
    ClockSpeed.create(clockSpeed),
    Name.create('CPU')
  ]);

  if (position) {
    cpu = Entity.attach(cpu, Position.create(position.x, position.y));
  }

  return cpu;
}

function generate() {
  return create(Random.float(1, 6).toFixed(1));
}
