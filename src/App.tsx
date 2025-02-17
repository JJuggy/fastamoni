/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {store} from '@store/index';
import RootNavigator from './navigators';
import DynamicModalProvider from '@providers/DynamicModalProvider';
import FlashMessage from 'react-native-flash-message';
import {initInterceptors} from '@utility/axiosQuery/axiosInterceptors';

function App(): JSX.Element {
  useEffect(() => {
    initInterceptors();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <DynamicModalProvider>
          <RootNavigator />
        </DynamicModalProvider>
        <FlashMessage position="top" />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
