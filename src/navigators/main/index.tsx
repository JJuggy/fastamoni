import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreenParam} from './screens';
import AppBottomBarNavigation from '../bottomTabs';

const {Navigator, Screen} = createStackNavigator<HomeScreenParam>();

const UserLoggedIn = () => {
  return (
    <Navigator
      initialRouteName="Tab"
      screenOptions={{
        headerShown: false,
      }}>
      <Screen name="Tab" component={AppBottomBarNavigation} />
    </Navigator>
  );
};

export default UserLoggedIn;
