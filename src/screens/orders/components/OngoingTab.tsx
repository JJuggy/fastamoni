import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {Paragraph} from '@components/text/text';
import {FlexedView, Spacer} from '@components/view';
import sharedImages from '@utility/sharedImages';
import data from '../../../data';
import OngoingItem from '@components/orders/ongoingItem';
import {useCart} from '@store/cart/hook';
import {AppButton} from '@components/button';
import {useNavigation} from '@react-navigation/native';
import {useGetOrdersQuery} from '@services/orders';

const OngoingTab = ({changeCurrentTab}: any) => {
  const {orders}: any = data;
  const {navigate} = useNavigation();
  // const {data: ongoingOrders} = useGetOrdersQuery('ONGOING');
  // console.warn('ongoingOrders', ongoingOrders);
  const cart = useCart();
  return (
    <SafeAreaView>
      <ScrollView>
        <Spacer />
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
          <OngoingItem type="buyer" orders={cart.cart} tab="ongoing" />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default OngoingTab;

const styles = StyleSheet.create({});
