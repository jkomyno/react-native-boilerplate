import { AppNavigator } from 'app/navigator';

export default (state, action) =>
  AppNavigator.router.getStateForAction(action, state) || state;
