/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {SafeAreaView, StyleSheet, View} from 'react-native';
import React from 'react';
import {RouteProp, useRoute} from '@react-navigation/native';
import {ViewContainer} from '@components/view';
import Header from '@components/header';
import {HomeScreenParam} from '@navigators/main/screens';
import CompletedOrderDetails from './completedOrderDetails';
import PendingTab from '../components/PendingTab';
import OngoingTab from '../components/OngoingTab';
import MoreOngoingDets from '../components/moreOngoingDets';
import PendingOrderDetails from './PendingOrderDetails';
import OngoingOrderDetails from './OngoingOrderDetails';
import CancelledOrderDetails from './CancelledOrderDetail';

type route = RouteProp<HomeScreenParam, 'OrderDetail'>;

export const OrderDetails = () => {
  const {params} = useRoute<route>();
  const getView = (tb: string) => {
    switch (tb) {
      case 'ongoing':
        return <OngoingOrderDetails id={params?.orderId as string} />;
      // case 'AWAITING_PAYMENT':
      //   return <OngoingOrderDetails id={params?.orderId as string} />;
      case 'AWAITING_PAYMENT':
        return <PendingOrderDetails id={params?.orderId as string} />;
      case 'Completed':
        return <CompletedOrderDetails id={params?.orderId as string} />;
      case 'cancelled':
        return <CancelledOrderDetails id={params?.orderId as string} />;
      default:
        return;
    }
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <ViewContainer style={{flex: 1}}>
        <Header title={'Order detail'} />
        <View style={{paddingTop: 12, flex: 1}}>{getView(params.status)}</View>
      </ViewContainer>
    </SafeAreaView>
  );
};

export default OrderDetails;

const styles = StyleSheet.create({});
