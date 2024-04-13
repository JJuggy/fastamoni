export interface Product {
  id?: number;
  price: number;
  minPrice?: string;
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
  };
  grade: string;
  stock?: string | number;
  thumbnail?: string;
  condition: string;
}
