import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {FlexedView, PressableView} from '@components/view';
import sharedImages from '@utility/sharedImages';
import {Paragraph} from '@components/text/text';
import data from '../../../data';
import colors from '@utility/colors';
import OrderItem from '@components/orders/orderItem';
import {AppButton} from '@components/button';
const CartTab = () => {
  const {orders} = data;
  const [numberOfOrders, setNumberOfOrders] = useState(1);
  return (
    <ScrollView
      style={{
        height: '100%',
      }}>
      <OrderItem orders={orders} />
      <AppButton
        onPress={() => null}
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
