import colors from '@utility/colors';
import {widthPixel} from '@utility/pxToDpConvert';
import React from 'react';
import {Platform, SafeAreaView, Text, View} from 'react-native';

const StoresScreen = () => {
  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === 'ios' ? 50 : 10,
        paddingHorizontal: widthPixel(20),
        backgroundColor: colors.white,
        flex: 1,
      }}>
      <Text> Stores screen</Text>
    </SafeAreaView>
  );
};

export default StoresScreen;
