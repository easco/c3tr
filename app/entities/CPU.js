import Avatar from 'components/Avatar';
import ClockSpeed from 'components/ClockSpeed';
import Entity from 'Entity';
import Random from 'Random';

// Data ------------------------------------------------------------------------

// Exports ---------------------------------------------------------------------

module.exports = {
  create,
  generate
};

// Functions -------------------------------------------------------------------

function create(clockSpeed) {
  return Entity.create([
    Avatar.create('#', '#CC6'),
    ClockSpeed.create(clockSpeed)
  ]);
}

function generate() {
  return create(Random.float(1, 6).toFixed(1));
}
