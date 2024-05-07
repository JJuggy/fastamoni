export interface Product {
  id?: number;
  price: number;
  minPrice?: string;
  brand: string;
  model_no: string;

  maxPrice?: string;
  description?: string;
  images?: string[];
  title: string;
  category?: {
    name: string;
  };
  store: {
    name: string;
    rating: number;
    _id: string;
  };
  grade: string;
  stock: number;
  thumbnail?: string;
  condition: string;
  _id: string;
}
