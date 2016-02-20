import Avatar from 'components/Avatar';
import BackgroundColor from 'components/BackgroundColor';
import Elevation from 'components/Elevation';
import Entity from 'Entity';
import Inventory from 'components/Inventory';
import Occupant from 'components/Occupant';
import Position from 'components/Position';

// Data ------------------------------------------------------------------------

const landAvatar = Avatar.create('.', '#462');
const landBackgroundColor = BackgroundColor.create('#240');
const waterAvatar = Avatar.create('~', '#68A');
const waterBackgroundColor = BackgroundColor.create('#246');

// Exports ---------------------------------------------------------------------

module.exports = {
  create,
  isEmpty
};

// Functions -------------------------------------------------------------------

function create(position, elevation, contents = []) {
  const isLand = elevation > 0;

  return Entity.create([
    isLand ? landBackgroundColor : waterBackgroundColor,
    isLand ? landAvatar : waterAvatar,
    Elevation.create(elevation),
    Inventory.create(contents),
    Occupant.create(),
    Position.create(position.x, position.y)
  ]);
}

function isEmpty(tile) {
  return !Occupant.isOccupied(tile) && Inventory.isEmpty(tile);
}
