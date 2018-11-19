import React from 'react';
import {
  TouchableOpacity, View,
} from 'react-native';
import {
  DrawerActions,
  StackActions,
  NavigationActions,
  createStackNavigator,
  createMaterialTopTabNavigator,
  createDrawerNavigator,
} from 'react-navigation';
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import Groups from './screens/groups';
import TestScreen from './screens/testScreen';
import GroupScreen from './screens/group.screen';
import ListScreen from './screens/list.screen';

// tabs in main screen
const MainScreenNavigator = createMaterialTopTabNavigator(
  {
    Groups: { screen: Groups },
    Settings: { screen: TestScreen },
  },
  {
    initialRouteName: 'Groups',
  },
);

const HeaderNavigator = createDrawerNavigator({
  GroupsDrawer: { screen: MainScreenNavigator },
  TestDrawer: { screen: TestScreen },
});

const AppNavigator = createStackNavigator(
  {
    HeaderNavigator: { screen: HeaderNavigator },
  },
  {
    headerMode: 'float',
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#58E6F9',
      },
      title: 'GetherApp',
      headerLeft: <View>
        <TouchableOpacity onPress={() => { navigation.dispatch(DrawerActions.toggleDrawer()); }}>
          <Icon name="md-menu" size={35} />
        </TouchableOpacity>
      </View>
    }),
  },
  {
    Main: { screen: MainScreenNavigator },
    Group: { screen: GroupScreen },
    List: { screen: ListScreen },
    Test: { screen: TestScreen },
  },
  {
    mode: 'modal',
  },
);


// reducer initialization code
const initialState = AppNavigator.router.getStateForAction(
  StackActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({
        routeName: 'Main',
      }),
    ],
  }),
);
export const navigationReducer = (state = initialState, action) => {
  const nextState = AppNavigator.router.getStateForAction(action, state);
  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
};
// Note: createReactNavigationReduxMiddleware must be run before createReduxBoundAddListener
export const navigationMiddleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav,
);
const App = reduxifyNavigator(AppNavigator, 'root');
const mapStateToProps = state => ({
  state: state.nav,
});
const AppWithNavigationState = connect(mapStateToProps)(App);
export default AppWithNavigationState;
