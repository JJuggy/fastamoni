import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreenParam} from './screens';
import BottomTabNavigator from '../bottomTabs';
import FilterScreen from '@screens/filter';

const {Navigator, Screen} = createStackNavigator<HomeScreenParam>();

const UserLoggedIn = () => {
  return (
    <Navigator
      initialRouteName="Tab"
      screenOptions={{
        headerShown: false,
      }}>
      <Screen name="Tab" component={BottomTabNavigator} />
      <Screen name="FilterScreen" component={FilterScreen} />
    </Navigator>
  );
};

export default UserLoggedIn;
