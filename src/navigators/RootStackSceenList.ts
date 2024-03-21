import {NavigatorScreenParams} from '@react-navigation/native';
import {AuthScreenList} from './auth/authParamList';

export type RootScreenList = {
  AuthNavigator: NavigatorScreenParams<AuthScreenList>;
  RootScreenList: undefined;
  onboarding: undefined;
  UserLoggedIn: undefined;
};
