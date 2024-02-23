/* eslint-disable @typescript-eslint/no-unused-vars */
import {View, Text} from 'react-native';
import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthScreenList} from '../../../navigators/auth/authParamList';

type navProps = StackNavigationProp<AuthScreenList>;

const SetupAccount: React.FC = () => {
  return (
    <View>
      <Text>sjfghde</Text>
    </View>
  );
};

export default SetupAccount;
