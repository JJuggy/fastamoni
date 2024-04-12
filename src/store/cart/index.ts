import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Cartitem} from '@services/carts/interface';
import {RootState} from '..';

interface CartState {
  products: Cartitem[];
}

const initialState: CartState = {
  products: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<{product: Cartitem}>) {
      const {product} = action.payload;
      state.products.push(product);
      AsyncStorage.setItem('@cart', JSON.stringify(state.products));
    },
    removeProduct(state, action: PayloadAction<{product: Cartitem}>) {
      const {product} = action.payload;
      state.products = state.products.filter(item => item !== product);
      AsyncStorage.setItem('@cart', JSON.stringify(state.products));
    },
    clearCart(state) {
      state.products = [];
      AsyncStorage.setItem('@cart', JSON.stringify(state.products));
    },
  },
});

export const {addProduct, removeProduct, clearCart} = cartSlice.actions;
export default cartSlice.reducer;
// Selector function to select cart products from the state
export const useSelectCart = (state: RootState) => state.cart.products;
