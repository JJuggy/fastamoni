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
                  source={sharedImages.icons.home}
                  tintColor={focused ? colors.primary : colors.gray}
                />
              </IconWrapper>
            ),
            Orders: (
              <IconWrapper focused={focused} name="Orders">
                <Image
                  source={sharedImages.icons.orders}
                  tintColor={focused ? colors.primary : colors.gray}
                />
              </IconWrapper>
            ),
            Profile: (
              <IconWrapper focused={focused} name="Profile">
                <Image
                  source={sharedImages.icons.profile}
                  tintColor={focused ? colors.primary : colors.gray}
                />
              </IconWrapper>
            ),
            Stores: (
              <IconWrapper focused={focused} name="Stores">
                <Image
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
      <Tab.Screen name="Orders" component={OrdersScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
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
