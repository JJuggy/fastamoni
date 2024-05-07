/* eslint-disable react-native/no-inline-styles */
import {Image, Pressable, ScrollView, View} from 'react-native';
import React from 'react';
import {BaseView, FlexedView, Spacer, ViewContainer} from '@components/view';
import Header from '@components/header';
import {Paragraph} from '@components/text/text';
import {useNavigation} from '@react-navigation/native';
import {HomeNavigatorParams} from 'src/types';
import {useClearCartMutation} from '@services/carts';
import {useDispatch} from 'react-redux';
import {useCart} from '@store/cart/hook';
import {clearCart} from '@store/cart';
import {AppButton} from '@components/button';
import sharedImages from '@utility/sharedImages';
import OrderItem from '@components/orders/orderItem';

const Cart = () => {
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
    <BaseView>
      <ViewContainer>
        <Header title="Cart" />
        <Spacer height={15} />
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
              <FlexedView
                style={{marginTop: 25}}
                justifyContent="space-between">
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
      </ViewContainer>
    </BaseView>
  );
};

export default Cart;
