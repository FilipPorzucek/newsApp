export interface User {
  id?: number;
  name: string;
  email: string;
  dateOfBirth: Date | string;  
  token?: string;
}