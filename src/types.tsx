import {StackNavigationProp} from '@react-navigation/stack';
import {ParamListBase} from '@react-navigation/native';
import {HomeScreenParam} from './navigators/main/screens';

export type nav<T extends ParamListBase> = StackNavigationProp<T>;

export type HomeNavigatorParams = nav<HomeScreenParam>;
