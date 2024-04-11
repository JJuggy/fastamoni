export interface Category {
  id: number;
  name: string;
  description: string;
  slug: string;
  parentCategoryId: string;
  icon: any;
}

export interface CreateCategoryArgs {
  body: Partial<Category>;
}

export interface UpdateCategoryArgs {
  id: number;
  body: Partial<Category>;
}
