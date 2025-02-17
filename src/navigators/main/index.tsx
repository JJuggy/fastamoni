import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreenParam} from './screens';
import BottomTabNavigator from '../bottomTabs';
import DealsOfTheDayScreen from '@screens/deals-of-the-day';
import SearchScreen from '@screens/home/SearchScreen';
import FilterScreen from '@screens/filter';
import ProductDetails from '@screens/product-details';
import Checkout from '@screens/orders/Checkout';
import Cart from '@screens/cart/Cart';
import Sales from '@screens/profile/sales';
import SaleDetail from '@screens/profile/sales/salesDetails';
import OrderDetails from '@screens/orders/order-details';

const {Navigator, Screen} = createStackNavigator<HomeScreenParam>();

const UserLoggedIn = () => {
  return (
    <Navigator
      initialRouteName="Tab"
      screenOptions={{
        headerShown: false,
      }}>
      <Screen name="Tab" component={BottomTabNavigator} />
      <Screen name="FilterScreen" component={FilterScreen} />
      <Screen name="DealsOfTheDayScreen" component={DealsOfTheDayScreen} />
      <Screen name="SearchScreen" component={SearchScreen} />
      <Screen name="ProductDetails" component={ProductDetails} />
      <Screen name="Checkout" component={Checkout} />
      <Screen name="Cart" component={Cart} />
      <Screen name="Sales" component={Sales} />
      <Screen name="SaleDetail" component={SaleDetail} />
      <Screen name="OrderDetail" component={OrderDetails} />
    </Navigator>
  );
};

export default UserLoggedIn;
