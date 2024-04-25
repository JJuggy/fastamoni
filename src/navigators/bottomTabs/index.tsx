/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, {PropsWithChildren, ReactElement} from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import StoresScreen from '@screens/stores';
import OrdersScreen from '@screens/orders';
import ProfileScreen from '@screens/profile';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import colors from '../../utility/colors';
import {Paragraph} from '@components/text/text';
import {House, Storefront, Bag, User, Plus} from 'phosphor-react-native';
import PlaceOrder from '@screens/place-order';
import {BottomTabParams} from './screens';
import sharedImages from '@utility/sharedImages';
import {HomeScreenParam} from '../main/screens';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '@screens/home';
import CreateStore from '@screens/stores/CreateStore';
import StoreDetailsScreen from '@screens/stores/StoreDetailsScreen';
import DealsOfTheDayScreen from '@screens/deals-of-the-day';
import TransactionHistory from '@screens/profile/TransactionHistory';
import RecentlyViewed from '@screens/profile/RecentlyViewed';
import MyStore from '@screens/profile/MyStore';
import Faq from '@screens/profile/Faq';
import ProfileDetails from '@screens/profile/ProfileDetails';
import Wallet from '@screens/profile/wallet';
import RecentlySearched from '@screens/profile/RecentlySearched';
import ReadMoreFaq from '@screens/profile/ReadMoreFaq';
import AllCategoriesScreen from '@screens/home/AllCategoriesScreen';
import CategoryScreen from '@screens/home/CategoryScreen';
import AllDealsScreen from '@screens/home/AllDealsScreen/AllDealsScreen';
import EditStoreScreen from '@screens/profile/EditStoreScreen';
import TransactionDetail from '@screens/profile/TransactionDetail';

interface BottomTabProps extends PropsWithChildren {
  name: string;
  focused: boolean;
}

const Tab = createBottomTabNavigator<BottomTabParams>();
const {Navigator, Screen} = createStackNavigator<HomeScreenParam>();

const IconWrapper = ({children, name, focused}: BottomTabProps) => {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8,
      }}>
      {children}
      <Paragraph color={focused ? colors.text_color : colors.in_active}>
        {name}
      </Paragraph>
    </View>
  );
};

const CustomTabBarButton = ({children, onPress, focused}: any) => (
  <TouchableOpacity
    style={{
      top: -30,
      justifyContent: 'center',
      alignItems: 'center',
      width: 70,
      height: 70,
      borderRadius: 35,
      backgroundColor: '#3BADED',
      ...styles.shadow,
      borderColor: colors.white,
    }}
    onPress={onPress}>
    <View>{children}</View>
  </TouchableOpacity>
);

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: colors.white,
          height: 90,
          position: 'absolute',
          bottom: 0,
          elevation: 0,
        },
        headerShown: false,
        tabBarIcon: ({
          focused,
        }: {
          focused: boolean;
          color: string;
          size: number;
        }) => {
          let icon_map = {
            Home: (
              <IconWrapper focused={focused} name="Home">
                <Image
                  style={{width: 30, height: 30}}
                  source={sharedImages.icons.home}
                  tintColor={focused ? colors.primary : colors.gray}
                />
              </IconWrapper>
            ),
            Orders: (
              <IconWrapper focused={focused} name="Orders">
                <Image
                  style={{width: 30, height: 30}}
                  source={sharedImages.icons.orders}
                  tintColor={focused ? colors.primary : colors.gray}
                />
              </IconWrapper>
            ),
            Profile: (
              <IconWrapper focused={focused} name="Profile">
                <Image
                  style={{width: 30, height: 30}}
                  source={sharedImages.icons.profile}
                  tintColor={focused ? colors.primary : colors.gray}
                />
              </IconWrapper>
            ),
            Stores: (
              <IconWrapper focused={focused} name="Stores">
                <Image
                  style={{width: 30, height: 30}}
                  source={sharedImages.icons.shop}
                  tintColor={focused ? colors.primary : colors.gray}
                />
              </IconWrapper>
            ),
          };
          //@ts-ignore
          return icon_map[route.name];
        },
      })}>
      <Tab.Screen name="Home" component={HomeNavigator} />
      <Tab.Screen name="Stores" component={StoreNavigator} />
      <Tab.Screen
        options={{
          tabBarButton: props => (
            <CustomTabBarButton {...props}>
              <Image source={sharedImages.icons.plus} />
            </CustomTabBarButton>
          ),
        }}
        name="PlaceOrder"
        component={PlaceOrder}
      />
      <Tab.Screen name="Orders" component={OrdersStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
};
const OrdersStack = () => {
  return (
    <Navigator
      initialRouteName="OrdersScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Screen name="OrdersScreen" component={OrdersScreen} />
      <Screen name="TransactionDetail" component={TransactionDetail} />
    </Navigator>
  );
};

const ProfileStack = () => {
  return (
    <Navigator
      initialRouteName="ProfileScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Screen name="ProfileScreen" component={ProfileScreen} />
      <Screen name="TransactionDetail" component={TransactionDetail} />
      <Screen name="CreateStore" component={CreateStore} />
      <Screen name="TransactionHistory" component={TransactionHistory} />
      <Screen name="RecentlyViewed" component={RecentlyViewed} />
      <Screen name="MyStore" component={MyStore} />
      <Screen name="ProfileDetails" component={ProfileDetails} />
      <Screen name="FAQs" component={Faq} />
      <Screen name="ReadMoreFaq" component={ReadMoreFaq} />
      <Screen name="Wallet" component={Wallet} />
      <Screen name="RecentlySearched" component={RecentlySearched} />
    </Navigator>
  );
};

const HomeNavigator = () => {
  return (
    <Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Screen name="HomeScreen" component={HomeScreen} />
      <Screen name="StoreDetailsScreen" component={StoreDetailsScreen} />
      <Screen name="AllCategoriesScreen" component={AllCategoriesScreen} />
      <Screen name="CategoryScreen" component={CategoryScreen} />
      <Screen name="AllDealsScreen" component={AllDealsScreen} />
    </Navigator>
  );
};

const StoreNavigator = () => {
  return (
    <Navigator
      initialRouteName="StoreScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Screen name="StoreScreen" component={StoresScreen} />
      <Screen name="CreateStore" component={CreateStore} />
      <Screen name="StoreDetailsScreen" component={StoreDetailsScreen} />
    </Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default BottomTabNavigator;
