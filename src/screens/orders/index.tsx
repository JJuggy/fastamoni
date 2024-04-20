/* eslint-disable react-native/no-inline-styles */
import {SafeAreaView} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '@components/header';
import {
  FlexedView,
  PressableView,
  Spacer,
  ViewContainer,
} from '@components/view';
import colors from '@utility/colors';
import CartTab from './components/CartTab';
import OngoingTab from './components/OngoingTab';
import CompletedTab from './components/CompletedTab';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useCart} from '@store/cart/hook';
import MoreOngoingDets from './components/moreOngoingDets';
import {current} from '@reduxjs/toolkit';

const getView = (screen: string, changeCurrentTab?: any) => {
  switch (screen) {
    case 'My cart':
      return <CartTab />;
    case 'Ongoing':
      return <OngoingTab changeCurrentTab={changeCurrentTab} />;
    case 'Completed':
      return <CompletedTab />;
    default:
      null;
  }
};

const OrdersScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  // const {tab} = route?.params as {tab: string | undefined};
  const [currentTab, setCurrentTab] = useState('My cart');
  // // const {type} = route.params as {type: string};
  // useEffect(() => {
  //   const focusSubscription = navigation.addListener('focus', () => {
  //     setCurrentTab(tab);
  //   });
  //   return focusSubscription;
  // }, [navigation, tab]);
  const changeCurrentTab = (tab: string, type: string) => {
    setCurrentTab(tab);
    setCustomerType(type);
  };
  const [customerType, setCustomerType] = useState('buyer');
  return (
    <SafeAreaView>
      <ViewContainer>
        <Header title="Orders" />

        <FlexedView style={{marginTop: 15}} justifyContent="space-between">
          <PressableView
            onPress={() => {
              setCurrentTab('My cart');
            }}
            textStyle={{color: currentTab === 'My cart' ? 'white' : '#707070'}}
            style={{
              borderRadius: 18,
              padding: 14,
              backgroundColor:
                currentTab === 'My cart' ? colors.primary : '#D2D2D2',
            }}>
            My cart
          </PressableView>
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
            }}>
            Ongoing
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
            }}>
            Completed
          </PressableView>
        </FlexedView>
        <Spacer />
        {currentTab === 'My cart' && getView('My cart')}
        {currentTab === 'Ongoing' && getView('Ongoing', changeCurrentTab)}
        {currentTab === 'Completed' && getView('Completed', changeCurrentTab)}
        {currentTab === 'MoreOngoingDets' && (
          <MoreOngoingDets customerType={customerType} />
        )}
      </ViewContainer>
    </SafeAreaView>
  );
};

export default OrdersScreen;
