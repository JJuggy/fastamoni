export interface Store {
  id: number;
  name: string;
  description: string;
  address: string;
  image: string;
}
export interface CreateStoreArgs {
  body: Partial<Store>;
}

export interface UpdateStoreArgs {
  body: Partial<Store>;
}
