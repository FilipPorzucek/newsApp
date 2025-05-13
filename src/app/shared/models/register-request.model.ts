export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  dateOfBirth: Date | string;
}