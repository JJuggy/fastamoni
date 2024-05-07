import {NavigatorScreenParams} from '@react-navigation/native';
import {BottomTabParams} from '../bottomTabs/screens';

export type HomeScreenParam = {
  Tab: NavigatorScreenParams<BottomTabParams>;
  HomeScreen: undefined;
  CreateStore: undefined;
  StoreScreen: undefined;
  StoreDetailsScreen: {productId: string | number};
  FilterScreen: undefined;
  DealsOfTheDayScreen: undefined;
  Orders: {
    type: 'buyer' | 'seller';
  };
  SearchScreen: undefined;
  ProductDetails: {detail: any};
  TransactionHistory: undefined;
  ProfileScreen: undefined;
  RecentlyViewed: undefined;
  MyStore: undefined;
  FAQs: undefined;
  Checkout: undefined;
  ProfileDetails: undefined;
  Wallet: undefined;
  RecentlySearched: undefined;
  ReadMoreFaq: undefined;
  AllCategoriesScreen: {
    categories: any;
  };
  CategoryScreen: {
    category: any;
  };
  AllDealsScreen: {
    deals: any;
  };
  Cart: undefined;
  Sales: undefined;
  SaleDetail: {id: string | number};
  OrdersScreen: undefined;
  TransactionDetail: undefined;
  OrderDetail: {orderId: string | number};
};
