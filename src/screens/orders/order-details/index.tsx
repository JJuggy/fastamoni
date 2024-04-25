import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import MoreOngoingDets from '../components/moreOngoingDets';
import {FlexedView, Spacer, ViewContainer} from '@components/view';
import Header from '@components/header';
import {Paragraph} from '@components/text/text';
import {Pressable} from 'react-native';
import data from '../../../data';
export const OrderDetails = () => {
  const route = useRoute();
  const {tab} = route.params;
  const getView = tb => {
    switch (tb) {
      case 'ongoing':
        return <MoreOngoingDets />;
      case 'pending':
        return <MorePendingDets />;
      case 'completed':
        return <MoreCompleteDets />;
      case 'cancelled':
        return <MoreCancelledDets />;
    }
  };
  return (
    <SafeAreaView>
      <ViewContainer>
        <Header title={`${tab} Orders`} />
        <View style={{paddingTop: 12}}>{getView(tab)}</View>
      </ViewContainer>
    </SafeAreaView>
  );
};
const MorePendingDets = () => {
  return (
    <View>
      <Text>More Pending Details</Text>
    </View>
  );
};
const MoreCompleteDets = (details: any, index: number) => {
  const {navigate} = useNavigation();
  const {completedOrders} = data;
  const completeView = (details: any) => {
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
  return completedOrders.map(
    (completedOrder: ICompleteOrder, index: number) => {
      return <View key={index}>{completeView(completedOrder, index)}</View>;
    },
  );
};
const MoreCancelledDets = () => {
  return (
    <View>
      <Text>More Cancelled Details</Text>
    </View>
  );
};

export default OrderDetails;

const styles = StyleSheet.create({});
