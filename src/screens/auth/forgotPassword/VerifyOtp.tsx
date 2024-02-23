/* eslint-disable @typescript-eslint/no-unused-vars */
import {Paragraph} from '../../../components/text/text';
import {StyleSheet, View} from 'react-native';
import React from 'react';

import {RouteProp, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthScreenList} from '../../../navigators/auth/authParamList';
import {heightPixel} from '../../../utility/pxToDpConvert';

import colors from '../../../utility/colors';

type navProps = StackNavigationProp<AuthScreenList>;
type routeProp = RouteProp<AuthScreenList, 'VerifyPhonenumber'>;

const CELL_COUNT = 6;

const VerifyOtp: React.FC = () => {
  const route = useRoute<routeProp>();

  return (
    <View>
      <Paragraph>hello</Paragraph>
    </View>
  );
};

const styles = StyleSheet.create({
  otpView: {
    marginBottom: 5,
    width: '100%',
  },
  otpBox: {
    width: heightPixel(50),
    height: heightPixel(50),
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    borderColor: '#D0D5DD',
    justifyContent: 'center',
  },
  otpFocus: {
    borderColor: '#DE183D',
    borderWidth: 1,
    borderRadius: 10,
  },
});

export default VerifyOtp;
