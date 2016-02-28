import Action from 'data/Action';
import Key from 'data/Key';

export default [
  { key: Key.COMMA, action: Action.TOGGLE_ITEMS },
  { key: Key.DOWN, action: Action.MOVE_SOUTH },
  { key: Key.LEFT, action: Action.MOVE_WEST },
  { key: Key.RIGHT, action: Action.MOVE_EAST },
  { key: Key.UP, action: Action.MOVE_NORTH },
  { key: Key.b, action: Action.MOVE_SOUTHWEST },
  { key: Key.h, action: Action.MOVE_WEST },
  { key: Key.i, action: Action.TOGGLE_INVENTORY },
  { key: Key.j, action: Action.MOVE_SOUTH },
  { key: Key.k, action: Action.MOVE_NORTH },
  { key: Key.l, action: Action.MOVE_EAST },
  { key: Key.m, action: Action.TOGGLE_LOG },
  { key: Key.n, action: Action.MOVE_SOUTHEAST },
  { key: Key.u, action: Action.MOVE_NORTHEAST },
  { key: Key.y, action: Action.MOVE_NORTHWEST }
];
