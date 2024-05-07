/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import Header from '@components/header';
import {
  FlexedView,
  PressableView,
  Spacer,
  ViewContainer,
} from '@components/view';
import colors from '@utility/colors';
import {useNavigation} from '@react-navigation/native';
import {View} from 'react-native';
import {useGetOrdersQuery} from '@services/orders';
import {Paragraph} from '@components/text/text';
import {AppButton} from '@components/button';
import sharedImages from '@utility/sharedImages';
import {NAIRA} from '@utility/naira';
import {demoOrders} from '../../data';
import {HomeNavigatorParams} from 'src/types';
import {useCart} from '@store/cart/hook';

const OrdersScreen = () => {
  const {navigate} = useNavigation<HomeNavigatorParams>();
  const [currentTab, setCurrentTab] = useState('Ongoing');
  const {data} = useGetOrdersQuery(currentTab.toUpperCase());
  console.log(data);
  const getStatusColor = (status: string) => {
    let color = '';
    switch (status) {
      case 'AWAITING_PAYMENT':
        color = 'orange';
        break;
      case 'COMPLETED':
        color = colors.success;
        break;
      case 'ONGOING':
        color = colors.warning;
        break;
      case 'CANCELLED':
        color = colors.red;
        break;

      default:
        break;
    }

    return color;
  };

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
        <FlatList
          data={data?.data}
          renderItem={({item}) => (
            <Pressable
              onPress={() => {
                navigate('OrderDetails', {tab: currentTab, item: item});
              }}>
              <FlexedView style={styles.item} justifyContent="space-between">
                <View>
                  <Paragraph fontSize={17}>{item?.product_title}</Paragraph>
                  <Paragraph mt={5}>{item?.order_no}</Paragraph>
                </View>
                <View>
                  <Paragraph
                    textAlign="right"
                    fontSize={
                      17
                    }>{`${NAIRA} ${item?.total_amount.toLocaleString()}`}</Paragraph>
                  <Paragraph
                    fontWeight="500"
                    textAlign="right"
                    mt={5}
                    color={getStatusColor(item?.status)}>
                    {item?.status.replace('_', ' ')}
                  </Paragraph>
                </View>
              </FlexedView>
            </Pressable>
          )}
          ListEmptyComponent={() => (
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
          )}
        />
      </ViewContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  item: {
    paddingVertical: 20,
    marginBottom: 20,
    backgroundColor: colors.white,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
});

export default OrdersScreen;
