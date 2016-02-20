import Avatar from 'components/Avatar';
import BackgroundColor from 'components/BackgroundColor';
import Entity from 'Entity';
import Inventory from 'components/Inventory';
import Position from 'components/Position';

// Data ------------------------------------------------------------------------

const landAvatar = Avatar.create('.', '#462');
const landBackgroundColor = BackgroundColor.create('#240');
const waterAvatar = Avatar.create('~', '#68A');
const waterBackgroundColor = BackgroundColor.create('#246');

// Exports ---------------------------------------------------------------------

module.exports = {
  create
};

// Functions -------------------------------------------------------------------

function create(position, elevation, contents = []) {
  const isLand = elevation > 0;

  return Entity.create([
    isLand ? landBackgroundColor : waterBackgroundColor,
    isLand ? landAvatar : waterAvatar,
    Inventory.create(contents),
    Position.create(position.x, position.y)
  ]);
}
