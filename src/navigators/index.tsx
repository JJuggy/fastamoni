/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthNavigator from './auth';
import {RootScreenList} from './RootStackSceenList';
import {useAuth} from '@store/auth/hook';
import Onboarding from '@screens/onboarding';
import {setCredential, setDidOnboard} from '@store/auth';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import UserLoggedIn from './main';

const {Screen, Navigator} = createNativeStackNavigator<RootScreenList>();

const RootNavigator: React.FC = () => {
  const {user, didOnboard} = useAuth();
  const {getItem} = useAsyncStorage('@user');
  const {getItem: getOnboard} = useAsyncStorage('onboard');
  const dispatch = useDispatch();

  // console.log(user, 'the user 00000');

  const retrieveStoredToken = async () => {
    const json = await getItem();
    const user_da = json !== null ? JSON.parse(json as string) : {};
    // console.log(user_da, 'the user data');
    dispatch(setCredential(user_da));
  };

  const getOnboardStatus = async () => {
    const onboardStatus = await getOnboard();
    // const status = onboardStatus !== null ? JSON.parse(onboardStatus) : false;
    if (onboardStatus) {
      dispatch(setDidOnboard(JSON.parse(onboardStatus)));
    }
  };

  // useEffect(() => {
  //   if (!appLoading) {
  //     SplashScreen.hide();
  //   }
  // }, [appLoading]);

  useEffect(() => {
    retrieveStoredToken();
    getOnboardStatus();
  }, []);

  return (
    <Navigator
      screenOptions={{
        animation: 'fade',
      }}
      initialRouteName="UserLoggedIn">
      {/* when checking if user has signed in  render splash screen*/}

      {!user && (
        <Screen
          name="UserLoggedIn"
          component={UserLoggedIn}
          options={{
            headerShown: false,
          }}
        />
      )}

      {!didOnboard && (
        <Screen
          name="onboarding"
          component={Onboarding}
          options={{
            headerShown: false,
            animationTypeForReplace: 'push',
          }}
        />
      )}

      {user && (
        <Screen
          name="AuthNavigator"
          component={AuthNavigator}
          options={{
            headerShown: false,
            animationTypeForReplace: !user ? 'pop' : 'push',
          }}
        />
      )}
    </Navigator>
  );
};

export default RootNavigator;
