/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {SafeAreaView, StyleSheet, View} from 'react-native';
import React from 'react';
import {RouteProp, useRoute} from '@react-navigation/native';
import {ViewContainer} from '@components/view';
import Header from '@components/header';
import {HomeScreenParam} from '@navigators/main/screens';
import CompletedOrderDetails from './completedOrderDetails';

type route = RouteProp<HomeScreenParam, 'OrderDetail'>;

export const OrderDetails = () => {
  const {params} = useRoute<route>();

  const getView = (tb: string) => {
    switch (tb) {
      case 'ongoing':
        return <CompletedOrderDetails />;
      case 'pending':
        return <CompletedOrderDetails />;
      case 'completed':
        return <CompletedOrderDetails />;
      case 'cancelled':
        return <CompletedOrderDetails />;
      default:
        return <CompletedOrderDetails />;
    }
  };
  return (
    <SafeAreaView>
      <ViewContainer>
        <Header title={`Order ${params.orderId}`} />
        <View style={{paddingTop: 12}}>
          {getView(params.orderId as string)}
        </View>
      </ViewContainer>
    </SafeAreaView>
  );
};

export default OrderDetails;

const styles = StyleSheet.create({});
