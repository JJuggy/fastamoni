import {User} from '@store/auth';

export interface Cartitem {
  productId: any;
  quantity: number;
  price: number;
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
