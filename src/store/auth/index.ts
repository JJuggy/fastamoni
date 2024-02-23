import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '..';

export interface User {
  email?: string;
  phone_number?: string;
  address?: string;
  country?: string;
  id?: number | string;
  last_name?: string;
  first_name?: string;
  picture?: any;
}

export interface Auth {
  user: User | null;
  token: string | null;
  isLoading?: boolean;
  didOnboard: boolean;
}

const initialState: Auth = {
  isLoading: true,
  didOnboard: false,
  token: null,
} as Auth;

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredential(state, {payload: {user}}: PayloadAction<Auth>) {
      AsyncStorage.setItem('@user', JSON.stringify({user}));
      state.user = user;
      state.isLoading = false;
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
