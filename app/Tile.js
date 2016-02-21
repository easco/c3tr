import Avatar from 'components/Avatar';
import BackgroundColor from 'components/BackgroundColor';
import Entity from 'Entity';

// Data ------------------------------------------------------------------------

const landAvatar = Avatar.create('.', '#462').value;
const landBackgroundColor = BackgroundColor.create('#240').value;

const waterAvatar = Avatar.create('~', '#68A').value;
const waterBackgroundColor = BackgroundColor.create('#246').value;

// Exports ---------------------------------------------------------------------

module.exports = {
  create
};

// Functions -------------------------------------------------------------------

function create(elevation) {
  const isLand = elevation > 0;

  return {
    backgroundColor: isLand ? landBackgroundColor : waterBackgroundColor,
    avatar: isLand ? landAvatar : waterAvatar,
    elevation
  };
}
