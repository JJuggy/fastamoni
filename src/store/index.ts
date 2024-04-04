import {configureStore} from '@reduxjs/toolkit';
import authReducer from './auth';
import {authApi} from '@services/auth';
import {productsApi} from '@services/products';

// import { authApi } from './auth/api';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    })
      .concat(authApi.middleware)
      .concat(productsApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
