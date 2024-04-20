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

const OngoingTab = ({changeCurrentTab}: any) => {
  const {orders}: any = data;
  const cart = useCart();
  return (
    <SafeAreaView>
      <ScrollView style={{height: '100%'}}>
        <Spacer />
        <OngoingItem
          changeCurrentTab={changeCurrentTab}
          type="seller"
          orders={cart.cart}
        />
        <OngoingItem
          changeCurrentTab={changeCurrentTab}
          type="buyer"
          orders={cart.cart}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default OngoingTab;

const styles = StyleSheet.create({});
