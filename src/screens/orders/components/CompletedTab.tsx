import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {FlexedView, Spacer} from '@components/view';
import {Paragraph} from '@components/text/text';
import data from '../../../data';

interface ICompleteOrder {
  orderNumber: string;
  orderItems: string[];
  orderDate: string;
  orderStatus: string;
  storeName: string;
  cancelled: boolean;
}
const CompletedTab = () => {
  const {completedOrders} = data;

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
          <Paragraph color="#737373" fontSize={12} fontWeight="300">
            View details
          </Paragraph>
        </View>
      </FlexedView>
    );
  };
  return (
    <ScrollView style={{height: '100%'}}>
      {completedOrders.map((completedOrder: ICompleteOrder, index: number) => {
        return completeView(completedOrder, index);
      })}
    </ScrollView>
  );
};

export default CompletedTab;

const styles = StyleSheet.create({});
