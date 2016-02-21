import Avatar from 'components/Avatar';
import BackgroundColor from 'components/BackgroundColor';
import Elevation from 'components/Elevation';
import Entity from 'Entity';
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
    Elevation.create(elevation),
    Position.create(position.x, position.y)
  ]);
}
