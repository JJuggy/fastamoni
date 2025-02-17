import {configureStore} from '@reduxjs/toolkit';
import authReducer from './auth';
import cartReducer from './cart';
import {authApi} from '@services/auth';
import {productsApi} from '@services/products';
import {categoriesApi} from '@services/categories';
import {cartApi} from '@services/carts';
import {storesApi} from '@services/stores';
import {utilityApi} from '@services/utility';
import {UserApi} from '@services/user';
import {historyApi} from '@services/history';
import {orderApi} from '@services/orders';

// import { authApi } from './auth/api';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    [authApi.reducerPath]: authApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [storesApi.reducerPath]: storesApi.reducer,
    [utilityApi.reducerPath]: utilityApi.reducer,
    [UserApi.reducerPath]: UserApi.reducer,
    [historyApi.reducerPath]: historyApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    })
      .concat(authApi.middleware)
      .concat(productsApi.middleware)
      .concat(categoriesApi.middleware)
      .concat(cartApi.middleware)
      .concat(storesApi.middleware)
      .concat(UserApi.middleware)
      .concat(historyApi.middleware)
      .concat(orderApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
