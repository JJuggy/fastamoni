/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {store} from '@store/index';
import RootNavigator from './navigators';
import DynamicModalProvider from '@providers/DynamicModalProvider';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <DynamicModalProvider>
          <RootNavigator />
        </DynamicModalProvider>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
