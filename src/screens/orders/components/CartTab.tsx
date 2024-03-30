/* eslint-disable react-native/no-inline-styles */
import {ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import data from '../../../data';
import OrderItem from '@components/orders/orderItem';
import {AppButton} from '@components/button';
import {HomeNavigatorParams, IOrderProps} from 'src/types';
import {useNavigation} from '@react-navigation/native';

const CartTab = () => {
  const {navigate} = useNavigation<HomeNavigatorParams>();
  const {orders}: IOrderProps['orders'] = data;
  return (
    <ScrollView
      style={{
        height: '100%',
      }}>
      <OrderItem orders={orders} />
      <AppButton
        onPress={() => navigate('Checkout')}
        textStyle={{color: 'white', fontWeight: '700'}}
        text="Proceed to checkout"
        style={{
          backgroundColor: '#2196F3',
          padding: 16,
          borderRadius: 12,
          marginTop: 50,
        }}
      />
    </ScrollView>
  );
};

export default CartTab;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#EEEEF1',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
});
