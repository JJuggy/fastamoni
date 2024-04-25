/* eslint-disable react-native/no-inline-styles */
import {SafeAreaView, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '@components/header';
import {
  FlexedView,
  PressableView,
  Spacer,
  ViewContainer,
} from '@components/view';
import colors from '@utility/colors';
import OngoingTab from './components/OngoingTab';
import CompletedTab from './components/CompletedTab';
import {useNavigation, useRoute} from '@react-navigation/native';
import MoreOngoingDets from './components/moreOngoingDets';
import {View} from 'react-native';
import PendingTab from './components/PendingTab';
import CancelledTab from './components/CancelledTab';

const getView = (screen: string, changeCurrentTab?: any) => {
  switch (screen) {
    case 'Ongoing':
      return <OngoingTab />;
    case 'Completed':
      return <CompletedTab />;
    case 'Pending':
      return <PendingTab />;
    case 'Cancelled':
      return <CancelledTab />;
    default:
      null;
  }
};

const OrdersScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [currentTab, setCurrentTab] = useState('Ongoing');


  const changeCurrentTab = (tab: string, type: string) => {
    setCurrentTab(tab);
    setCustomerType(type);
  };
  const [customerType, setCustomerType] = useState('buyer');
  return (
    <SafeAreaView>
      <ViewContainer>
        <Header title="Orders" />
        <ScrollView
          showsHorizontalScrollIndicator={false}
          style={{marginTop: 15}}
          horizontal={true}>
          <PressableView
            onPress={() => {
              setCurrentTab('Ongoing');
            }}
            textStyle={{
              color:
                currentTab === 'Ongoing' || currentTab === 'MoreOngoingDets'
                  ? 'white'
                  : '#707070',
            }}
            style={{
              borderRadius: 18,
              padding: 14,
              backgroundColor:
                currentTab === 'Ongoing' || currentTab === 'MoreOngoingDets'
                  ? colors.primary
                  : '#D2D2D2',
              marginRight: 5,
            }}>
            Ongoing
          </PressableView>
          <PressableView
            onPress={() => {
              setCurrentTab('Pending');
            }}
            textStyle={{color: currentTab === 'Pending' ? 'white' : '#707070'}}
            style={{
              borderRadius: 18,
              padding: 14,
              backgroundColor:
                currentTab === 'Pending' ? colors.primary : '#D2D2D2',
              marginRight: 5,
            }}>
            Pending
          </PressableView>
          <PressableView
            textStyle={{
              color: currentTab === 'Completed' ? 'white' : '#707070',
            }}
            onPress={() => {
              setCurrentTab('Completed');
            }}
            style={{
              borderRadius: 18,
              padding: 14,
              backgroundColor:
                currentTab === 'Completed' ? colors.primary : '#D2D2D2',
              marginRight: 5,
            }}>
            Completed
          </PressableView>
          <PressableView
            onPress={() => {
              setCurrentTab('Cancelled');
            }}
            textStyle={{
              color: currentTab === 'Cancelled' ? 'white' : '#707070',
            }}
            style={{
              borderRadius: 18,
              padding: 14,
              backgroundColor:
                currentTab === 'Cancelled' ? colors.primary : '#D2D2D2',
              marginRight: 5,
            }}>
            Cancelled
          </PressableView>
        </ScrollView>
        <Spacer />
        <View>
          {currentTab === 'Pending' && getView('Pending')}
          {currentTab === 'Ongoing' && getView('Ongoing')}
          {currentTab === 'Completed' && getView('Completed')}
          {currentTab === 'Cancelled' && getView('Cancelled')}
        </View>
      </ViewContainer>
    </SafeAreaView>
  );
};

export default OrdersScreen;
