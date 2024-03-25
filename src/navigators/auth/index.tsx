import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AuthScreenList} from './authParamList';
import SignUp from '@screens/auth/signup';
import SignIn from '@screens/auth/signin';
import ForgotPassword from '@screens/auth/forgotPassword';

const {Screen, Navigator} = createStackNavigator<AuthScreenList>();

const AuthNavigator = () => {
  return (
    <Navigator initialRouteName={'SignIn'} screenOptions={{headerShown: false}}>
      <Screen name="SignUp" component={SignUp} />

      <Screen name="SignIn" component={SignIn} />
      <Screen name="ForgotPassword" component={ForgotPassword} />
    </Navigator>
  );
};

export default AuthNavigator;
