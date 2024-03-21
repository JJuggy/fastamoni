import {Platform, SafeAreaView, Text, View} from 'react-native';
import React from 'react';
import {widthPixel} from '@utility/pxToDpConvert';
import colors from '@utility/colors';

const OrdersScreen = () => {
  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === 'ios' ? 50 : 10,
        paddingHorizontal: widthPixel(20),
        backgroundColor: colors.white,
        flex: 1,
      }}>
      <Text>Orders screen</Text>
    </SafeAreaView>
  );
};

export default OrdersScreen;
