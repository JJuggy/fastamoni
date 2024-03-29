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
  Orders: undefined;
  SearchScreen: undefined;
};
