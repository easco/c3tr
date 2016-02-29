import Action from 'data/Action';
import Key from 'data/Key';

export default [
  { key: Key.COMMA, action: Action.FOCUS_GAME },
  { key: Key.ESCAPE, action: Action.FOCUS_GAME },
  { key: Key.ENTER, action: Action.TAKE_ITEM },
  { key: Key.LOWER_J, action: Action.SELECT_NEXT_ITEM },
  { key: Key.LOWER_K, action: Action.SELECT_PREVIOUS_ITEM }
];
