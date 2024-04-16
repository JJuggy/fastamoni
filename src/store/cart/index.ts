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
    addToCart(state, action: PayloadAction<{product: Cartitem}>) {
      const {product} = action.payload;
      console.log(product, 'PRODUCDT TO DDDA');
      const index = state.products.findIndex(
        prod => prod.productId === product.productId,
      );

      if (index < 0) {
        state.products.push(product);
      } else {
        state.products[index] = product;
      }
      // console.log(state.products, ':EBGTH');
      AsyncStorage.setItem('@cart', JSON.stringify(state.products));
    },
    removeFromCart(state, action: PayloadAction<{product: Cartitem}>) {
      const {product} = action.payload;
      state.products = state.products.filter(
        item => item.productId !== product.productId,
      );
      AsyncStorage.setItem('@cart', JSON.stringify(state.products));
    },
    clearCart(state) {
      state.products = [];
      AsyncStorage.setItem('@cart', JSON.stringify(state.products));
    },
    updateCart(state, action: PayloadAction<{products: Cartitem[]}>) {
      console.log('Called');
      const {products} = action.payload;
      // console.log(products, 'new Products');
      state.products = products;
      AsyncStorage.setItem('@cart', JSON.stringify(state.products));
    },
  },
});

export const {addToCart, removeFromCart, clearCart, updateCart} =
  cartSlice.actions;
export default cartSlice.reducer;
// Selector function to select cart products from the state
export const useSelectCart = (state: RootState) => state.cart.products;
