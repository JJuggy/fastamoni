/* eslint-disable react-native/no-inline-styles */
import {ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import data from '../../../data';
import OrderItem from '@components/orders/orderItem';
import {AppButton} from '@components/button';
import {HomeNavigatorParams, IOrderProps} from 'src/types';
import {useNavigation} from '@react-navigation/native';
import {useCart} from '@store/cart/hook';
import {Paragraph} from '@components/text/text';
import {Image} from 'react-native';
import {FlexedView} from '@components/view';
import sharedImages from '@utility/sharedImages';

const CartTab = () => {
  const {navigate} = useNavigation<HomeNavigatorParams>();
  const cart = useCart();
  let totalPrice: number = 0;
  cart.cart.reduce((total, product) => {
    return (totalPrice = total + product.price);
  }, 0);
  return (
    <ScrollView
      style={{
        height: '100%',
      }}>
      <OrderItem orders={cart.cart} />
      <FlexedView style={{marginTop: 25}} justifyContent="space-between">
        <Paragraph>Total</Paragraph>
        <FlexedView>
          <Image
            tintColor={'#1E89DD'}
            style={{
              width: 15,
              height: 15,
              marginRight: 5,
            }}
            source={sharedImages.icons.naira}
          />
          <Paragraph
            style={{
              color: '#1E89DD',
            }}
            fontSize={19}
            fontWeight="800">
            {totalPrice}
          </Paragraph>
        </FlexedView>
      </FlexedView>
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
