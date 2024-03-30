import {StackNavigationProp} from '@react-navigation/stack';
import {ParamListBase} from '@react-navigation/native';
import {HomeScreenParam} from './navigators/main/screens';

export interface IOrder {
  storeName: string;
  productName: string;
  price: number;
}
export interface IOrderProps {
  orders: IOrder[];
}
export type nav<T extends ParamListBase> = StackNavigationProp<T>;

export type HomeNavigatorParams = nav<HomeScreenParam>;
