import Action from 'data/Action';
import Key from 'data/Key';

export default [
  { key: Key.COMMA, action: Action.FOCUS_ITEMS },
  { key: Key.DOWN, action: Action.MOVE_SOUTH },
  { key: Key.LEFT, action: Action.MOVE_WEST },
  { key: Key.LOWER_B, action: Action.MOVE_SOUTHWEST },
  { key: Key.LOWER_H, action: Action.MOVE_WEST },
  { key: Key.LOWER_I, action: Action.FOCUS_INVENTORY },
  { key: Key.LOWER_J, action: Action.MOVE_SOUTH },
  { key: Key.LOWER_K, action: Action.MOVE_NORTH },
  { key: Key.LOWER_L, action: Action.MOVE_EAST },
  { key: Key.LOWER_M, action: Action.FOCUS_LOG },
  { key: Key.LOWER_N, action: Action.MOVE_SOUTHEAST },
  { key: Key.LOWER_U, action: Action.MOVE_NORTHEAST },
  { key: Key.LOWER_Y, action: Action.MOVE_NORTHWEST },
  { key: Key.RIGHT, action: Action.MOVE_EAST },
  { key: Key.UP, action: Action.MOVE_NORTH }
];
