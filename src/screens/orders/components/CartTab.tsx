/* eslint-disable react-native/no-inline-styles */
import {Pressable, ScrollView, StyleSheet} from 'react-native';
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
import {View} from 'react-native';
import {useClearCartMutation} from '@services/carts';
import {useDispatch} from 'react-redux';
import {clearCart} from '@store/cart';

const CartTab = () => {
  const {navigate} = useNavigation<HomeNavigatorParams>();
  const [clearCartItems] = useClearCartMutation();
  const dispatch = useDispatch();

  const clearUserCart = () => {
    clearCartItems()
      .unwrap()
      .then(() => {
        dispatch(clearCart());
      })
      .catch(err => {
        console.log(err, 'CLEAR ERRO');
      });
  };

  const cart = useCart();
  let totalPrice: number = 0;
  cart.cart.reduce((total, product: any) => {
    return (totalPrice = total + product?.product.price * product?.quantity);
  }, 0);
  return (
    <ScrollView
      style={{
        height: '100%',
      }}>
      {cart.cart.length == 0 ? (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 40,
          }}>
          <Image
            source={sharedImages.emptyCat}
            style={{
              height: 300,
              width: '100%',
              marginBottom: 40,
            }}
          />
          <Paragraph fontWeight="600" color="#B1B1B1">
            There is currently no item in this Category
          </Paragraph>
          <AppButton
            style={{
              width: '100%',
              marginTop: 30,
            }}
            variant="primary"
            text="Back to Home"
            onPress={() => {
              navigate('HomeScreen');
            }}
          />
        </View>
      ) : (
        <>
          <Pressable onPress={clearUserCart}>
            <Paragraph>CLEAR CART</Paragraph>
          </Pressable>
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
                {totalPrice.toLocaleString()}
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
        </>
      )}
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
