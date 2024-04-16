import {Product} from '@services/products/interface';
import {User} from '@store/auth';

export interface Cartitem {
  product?: Product;
  productId?: any;
  quantity: number;
  price?: number;
  product_title: string;
  images?: any;
  store?: {
    name: string;
  }[];
  title?: string;
}
export interface Carts {
  user: User;
  items: Cartitem[];
}

export interface CreateCartItemArgs {
  body: Partial<Carts>;
}
export interface UpdateCartItemArgs {
  body: Partial<Carts>;
}
