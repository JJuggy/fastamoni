import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '..';

export interface User {
  email?: string;
  id?: number | string;
  last_name?: string;
  first_name?: string;
  email_verified?: boolean;
  storeId?: string;
}

export interface Auth {
  user: User | null;
  token: string | null;
  didOnboard: boolean;
  isLoading: boolean;
}

const initialState: Auth = {
  isLoading: true,
  didOnboard: false,
  token: null,
  user: null,
} as Auth;

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredential(state, {payload: {user}}: PayloadAction<Pick<Auth, 'user'>>) {
      AsyncStorage.setItem('@user', JSON.stringify({user}));
      state.user = user;
    },

    setToken(state, {payload: val}: PayloadAction<string>) {
      state.token = val;
      AsyncStorage.setItem('@token', val);
    },
    setDidOnboard(state, {payload: val}: PayloadAction<boolean>) {
      state.didOnboard = true;
      state.isLoading = false;
      AsyncStorage.setItem('onboard', JSON.stringify(val));
    },
  },
});

export const {setCredential, setDidOnboard, setToken} = authSlice.actions;
export default authSlice.reducer;
export const useSelectUser = (state: RootState): User | null | undefined =>
  state.auth.user;
export const useAppLoading = (state: RootState) => state.auth.isLoading;
export const onboardStatus = (state: RootState) => state.auth.didOnboard;
export const useTokenSelector = (state: RootState) => state.auth.token;
