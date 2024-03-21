/* eslint-disable @typescript-eslint/no-unused-vars */

import React, {ReactElement} from 'react';
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
const IconWrapper = ({children, iconName, focused}: any) => {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8,
      }}>
      {children}
      <Paragraph color={focused ? colors.text_color : colors.in_active}>
        {iconName}
      </Paragraph>
    </View>
  );
};

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
      borderColor: colors.white,
    }}
    onPress={onPress}>
    <View>{children}</View>
  </TouchableOpacity>
);
const UserLoggedIn = () => {
  return (
    <SafeAreaProvider>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: 'transparent',
            height: 90,
            position: 'absolute',
            bottom: 25,
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
              HomeScreen: (
                <IconWrapper focused={focused} iconName="Home">
                  <House
                    color={focused ? colors.text_color : colors.in_active}
                    size={32}
                  />
                </IconWrapper>
              ),
              OrdersScreen: (
                <IconWrapper focused={focused} iconName="Orders">
                  <Storefront
                    color={focused ? colors.text_color : colors.in_active}
                    size={32}
                  />
                </IconWrapper>
              ),
              ProfileScreen: (
                <IconWrapper focused={focused} iconName="Profile">
                  <User
                    color={focused ? colors.text_color : colors.in_active}
                    size={32}
                  />
                </IconWrapper>
              ),
              StoresScreen: (
                <IconWrapper focused={focused} iconName="Stores">
                  <Storefront
                    color={focused ? colors.text_color : colors.in_active}
                    size={32}
                  />
                </IconWrapper>
              ),
            };
            //@ts-ignore
            return icon_map[route.name];
          },
        })}>
        <Tab.Screen name="HomeScreen" component={HomeScreen} />
        <Tab.Screen name="StoresScreen" component={StoresScreen} />
        <Tab.Screen
          options={{
            tabBarIcon: ({focused}) => <Plus size={50} color={colors.white} />,
            tabBarButton: props => <CustomTabBarButton {...props} />,
          }}
          name="PlaceOrderScreen"
          component={PlaceOrder}
        />
        <Tab.Screen name="OrdersScreen" component={OrdersScreen} />
        <Tab.Screen name="ProfileScreen" component={ProfileScreen} />
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

export default UserLoggedIn;
