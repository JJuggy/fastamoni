import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AuthScreenList} from './authParamList';
import SignUp from '@screens/auth/signup';
import VerifyPhonenumber from '@screens/auth/signup/VerifyNumber';
import SignIn from '@screens/auth/signin';
import ForgotPassword from '@screens/auth/forgotPassword';
import VerifyOtp from '@screens/auth/forgotPassword/VerifyOtp';
import CreatePassword from '@screens/auth/forgotPassword/CreatePassword';

const {Screen, Navigator} = createStackNavigator<AuthScreenList>();

const AuthNavigator = () => {
  return (
    <Navigator initialRouteName={'SignIn'} screenOptions={{headerShown: false}}>
      <Screen name="SignUp" component={SignUp} />
      <Screen name="VerifyPhonenumber" component={VerifyPhonenumber} />
      <Screen name="SignIn" component={SignIn} />
      <Screen name="ForgotPassword" component={ForgotPassword} />
      <Screen name="VerifyOtp" component={VerifyOtp} />
      <Screen name="CreatePassword" component={CreatePassword} />
    </Navigator>
  );
};

export default AuthNavigator;
