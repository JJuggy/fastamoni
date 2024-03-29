import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreenParam} from './screens';
import BottomTabNavigator from '../bottomTabs';
import DealsOfTheDayScreen from '@screens/deals-of-the-day';
import SearchScreen from '@screens/home/SearchScreen';
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
      <Screen name="DealsOfTheDayScreen" component={DealsOfTheDayScreen} />
      <Screen name="SearchScreen" component={SearchScreen} />
    </Navigator>
  );
};

export default UserLoggedIn;
