export interface Product {
  id?: number;
  price?: number | string;
  minPrice?: string;
  maxPrice?: string;
  description?: string;
  images?: string[];
  title?: string;
  category?: string;
  store?: string;
  grade?: string;
  stock?: string | number;
  thumbnail?: string;
}
