/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import {FlexedView, Spacer} from '@components/view';
import {Paragraph} from '@components/text/text';
import data from '../../../data';
import {Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Image} from 'react-native';
import sharedImages from '@utility/sharedImages';
import {AppButton} from '@components/button';
import OngoingItem from '@components/orders/ongoingItem';
import {SafeAreaView} from 'react-native';
import {useCart} from '@store/cart/hook';
import {HomeNavigatorParams} from 'src/types';

interface ICompleteOrder {
  orderNumber: string;
  orderItems: string[];
  orderDate: string;
  orderStatus: string;
  storeName: string;
  cancelled: boolean;
}
const CompletedTab = () => {
  const cart = useCart();
  const {navigate} = useNavigation<HomeNavigatorParams>();
  const completeView = (details: ICompleteOrder, index: number) => {
    return (
      <FlexedView
        key={index}
        justifyContent="space-between"
        style={{
          borderBottomWidth: 0.5,
          borderBottomColor: '#D2D2D2',
          paddingVertical: 16,
        }}>
        <View style={{flexDirection: 'column'}}>
          <Paragraph style={{color: '#737373'}} fontSize={15} fontWeight="700">
            {details.storeName}
          </Paragraph>
          <Spacer />
          <Paragraph color="#737373" fontSize={13} fontWeight="300">
            {details.orderDate}
          </Paragraph>
        </View>
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'flex-end',
          }}>
          {details.cancelled ? (
            <Paragraph color="#F28F77" fontSize={13} fontWeight="300">
              Cancelled
            </Paragraph>
          ) : (
            <Paragraph color="#737373" fontSize={13} fontWeight="300">
              Order {details.orderNumber}
            </Paragraph>
          )}
          <Spacer />
          <Pressable
            onPress={() => {
              // Navigate to TransactionDetail
              navigate('TransactionDetail');
            }}>
            <Paragraph color="#737373" fontSize={12} fontWeight="300">
              View details
            </Paragraph>
          </Pressable>
        </View>
      </FlexedView>
    );
  };
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
          <OngoingItem type="buyer" orders={cart.cart} tab="completed" />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CompletedTab;

const styles = StyleSheet.create({});
