export interface Category {
  _id: number;
  name: string;
  description: string;
  slug: string;
  parentCategoryId: string;
}

export interface CreateCategoryArgs {
  body: Partial<Category>;
}

export interface UpdateCategoryArgs {
  id: number;
  body: Partial<Category>;
}
