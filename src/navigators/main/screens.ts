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
  ProductDetails: undefined;
  TransactionHistory: undefined;
  ProfileScreen: undefined;
  RecentlyViewed: undefined;
  MyStore: undefined;
  FAQs: undefined;
  Checkout: undefined;
};
