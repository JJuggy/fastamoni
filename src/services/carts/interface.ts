import {User} from '@store/auth';

export interface Cartitem {
  product?:any,
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
