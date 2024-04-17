export interface History {
  id: number;
  user_id: number;
  search: string;
  created_at: string;
  updated_at: string;
}
export interface UpdateHistoryArgs {
  id: number;
  body: Partial<History>;
}
