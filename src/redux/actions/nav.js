import { NavigationActions } from 'react-navigation';
import { INITIAL_ROUTE_NAME } from 'app/navigator';

export const navigate = (routeName = INITIAL_ROUTE_NAME) => (dispatch) => {
  dispatch(NavigationActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({
        routeName,
      }),
    ],
  }));
};
