/* eslint-disable @typescript-eslint/no-unused-vars */

import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import HomeScreen from '@screens/home/index';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import StoresScreen from '@screens/stores';
import OrdersScreen from '@screens/orders';
import ProfileScreen from '@screens/profile';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import colors from '../../utility/colors';
import {Paragraph} from '@components/text/text';
import {House, Storefront, Bag, User, Plus} from 'phosphor-react-native';
import PlaceOrder from '@screens/place-order';
const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({children, onPress}: any) => (
  <TouchableOpacity
    style={{
      top: -30,
      justifyContent: 'center',
      alignItems: 'center',
      width: 70,
      height: 70,
      borderRadius: 35,
      backgroundColor: colors.secondary,
      ...styles.shadow,
      // borderWidth:12,
      borderColor: colors.white,
    }}
    onPress={onPress}>
    <View>{children}</View>
  </TouchableOpacity>
);
const DashboardNavigator = () => {
  return (
    <SafeAreaProvider>
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: colors.white,
            height: 90,
            position: 'absolute',
            bottom: 25,
            elevation: 0,
          },
          headerShown: false,
        }}>
        <Tab.Screen
          options={{
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  top: 10,
                }}>
                <House
                  color={focused ? colors.secondary : colors.border}
                  size={32}
                />
                <Paragraph color={focused ? colors.secondary : colors.border}>
                  Home
                </Paragraph>
              </View>
            ),
          }}
          name="HomeScreen"
          component={HomeScreen}
        />

        <Tab.Screen
          options={{
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  top: 10,
                }}>
                <Storefront
                  color={focused ? colors.secondary : colors.border}
                  size={32}
                />
                <Paragraph color={focused ? colors.secondary : colors.border}>
                  Stores
                </Paragraph>
              </View>
            ),
          }}
          name="StoresScreen"
          component={StoresScreen}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({focused}) => <Plus size={50} color={colors.white} />,
            tabBarButton: props => <CustomTabBarButton {...props} />,
          }}
          name="PlaceOrderScreen"
          component={PlaceOrder}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  top: 10,
                }}>
                <Bag
                  color={focused ? colors.secondary : colors.border}
                  size={32}
                />
                <Paragraph color={focused ? colors.secondary : colors.border}>
                  Orders
                </Paragraph>
              </View>
            ),
          }}
          name="OrdersScreen"
          component={OrdersScreen}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  top: 10,
                }}>
                <User
                  color={focused ? colors.secondary : colors.border}
                  size={32}
                />
                <Paragraph color={focused ? colors.secondary : colors.border}>
                  Profile
                </Paragraph>
              </View>
            ),
          }}
          name="ProfileScreen"
          component={ProfileScreen}
        />
      </Tab.Navigator>
    </SafeAreaProvider>
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

export default DashboardNavigator;
