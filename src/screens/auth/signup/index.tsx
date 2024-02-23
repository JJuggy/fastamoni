/* eslint-disable @typescript-eslint/no-unused-vars */

import {ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import {BaseView, ViewContainer} from '@components/view';
import {Paragraph} from '@components/text/text';
import {heightPixel} from '@utility/pxToDpConvert';
import colors from '@utility/colors';

const SignUp: React.FC = () => {
  return (
    <BaseView>
      <ScrollView style={{flex: 1}}>
        <ViewContainer style={{flex: 1}}>
          <Paragraph>hello</Paragraph>
        </ViewContainer>
      </ScrollView>
    </BaseView>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: heightPixel(70),
    height: heightPixel(70),
    alignSelf: 'center',
  },
  box: {
    paddingVertical: heightPixel(50),
    backgroundColor: colors.white,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
});

export default SignUp;
