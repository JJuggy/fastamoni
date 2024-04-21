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
import colors from '@utility/colors';
import sharedImages from '@utility/sharedImages';
import OrderItem from '@components/orders/orderItem';
import data from '../../../data';
import {IOrder, IOrderProps} from 'src/types';
import CodeInputField from '@components/code-field';
import {Linking} from 'react-native';
import OngoingItem from '@components/orders/ongoingItem';
import {useCart} from '@store/cart/hook';
import {AppButton} from '@components/button';
import {useNavigation} from '@react-navigation/native';

const OngoingTab = ({changeCurrentTab}: any) => {
  const {orders}: any = data;
  const {navigate} = useNavigation();
  const cart = useCart();
  return (
    <SafeAreaView>
      <ScrollView style={{height: '100%'}}>
        <Spacer />
        {cart.cart.length > 0 ? (
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
          <OngoingItem
            changeCurrentTab={changeCurrentTab}
            type="seller"
            orders={cart.cart}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default OngoingTab;

const styles = StyleSheet.create({});
