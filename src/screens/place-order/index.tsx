import colors from '@utility/colors';
import {widthPixel} from '@utility/pxToDpConvert';
import React from 'react';
import {Platform, SafeAreaView, View, Text} from 'react-native';

const PlaceOrder = () => {
  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === 'ios' ? 50 : 10,
        paddingHorizontal: widthPixel(20),
        backgroundColor: colors.white,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Place order creen</Text>
    </SafeAreaView>
  );
};

export default PlaceOrder;
