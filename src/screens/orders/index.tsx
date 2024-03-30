/* eslint-disable react-native/no-inline-styles */
import {SafeAreaView} from 'react-native';
import React, {useState} from 'react';
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

const getView = (screen: string) => {
  switch (screen) {
    case 'My cart':
      return <CartTab />;
    case 'Ongoing':
      return <OngoingTab />;
    case 'Completed':
      return <CompletedTab />;
    default:
      null;
  }
};
const OrdersScreen = () => {
  const [currentTab, setCurrentTab] = useState('My cart');

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
              borderRadius: 12,
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
            textStyle={{color: currentTab === 'Ongoing' ? 'white' : '#707070'}}
            style={{
              borderRadius: 12,
              padding: 14,
              backgroundColor:
                currentTab === 'Ongoing' ? colors.primary : '#D2D2D2',
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
              borderRadius: 12,
              padding: 14,
              backgroundColor:
                currentTab === 'Completed' ? colors.primary : '#D2D2D2',
            }}>
            Completed
          </PressableView>
        </FlexedView>
        <Spacer />
        {currentTab === 'My cart' && getView('My cart')}
        {currentTab === 'Ongoing' && getView('Ongoing')}
        {currentTab === 'Completed' && getView('Completed')}
      </ViewContainer>
    </SafeAreaView>
  );
};

export default OrdersScreen;
