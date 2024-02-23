/* eslint-disable @typescript-eslint/no-unused-vars */
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {AuthScreenList} from '../../../navigators/auth/authParamList';
import {Platform, Text, View} from 'react-native';

type AuthScreenProps = StackNavigationProp<AuthScreenList>;

const ForgotPassword: React.FC = () => {
  return (
    <View>
      <Text>hello</Text>
    </View>
  );
};

export default ForgotPassword;
