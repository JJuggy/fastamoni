import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreenParam} from './screens';
import BottomTabNavigator from '../bottomTabs';
import {BaseView} from '@components/view';

const {Navigator, Screen} = createStackNavigator<HomeScreenParam>();

const UserLoggedIn = () => {
  return (
    <BaseView>
      <Navigator
        initialRouteName="HomeScreen"
        screenOptions={{
          headerShown: false,
        }}>
        <Screen name="HomeScreen" component={BottomTabNavigator} />
      </Navigator>
    </BaseView>
  );
};

export default UserLoggedIn;
