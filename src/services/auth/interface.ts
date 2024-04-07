export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignUpRequest {
  email: string;
  password: string;
  last_name: string;
  first_name: string;
  business_name?: string;
}
