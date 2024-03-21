/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import {Platform, View} from 'react-native';
import {widthPixel} from '@utility/pxToDpConvert';
import {ViewContainer} from '@components/view';
import {Paragraph} from '@components/text/text';
import colors from '@utility/colors';

const HomeScreen: React.FC = ({}) => {
  return (
    <View
      style={{
        paddingTop: Platform.OS === 'ios' ? 50 : 10,
        paddingHorizontal: widthPixel(20),
        backgroundColor: colors.white,
        flex: 1,
      }}>
      <ViewContainer>
        <Paragraph fontSize={17} lineHeight={21} fontWeight="400">
          HomeScreen
        </Paragraph>
      </ViewContainer>
    </View>
  );
};

export default HomeScreen;
