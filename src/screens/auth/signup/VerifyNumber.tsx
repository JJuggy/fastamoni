/* eslint-disable @typescript-eslint/no-unused-vars */
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthScreenList} from '../../../navigators/auth/authParamList';

type navProps = StackNavigationProp<AuthScreenList>;

const VerifyPhonenumber: React.FC = () => {
  return (
    <View>
      <Text>sfnj</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  otpView: {
    marginBottom: 5,
    width: '100%',
  },
});

export default VerifyPhonenumber;
