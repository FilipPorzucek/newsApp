export interface User {
  id?: number;
  name: string;
  email: string;
  dateOfBirth: Date | string;  
    access_token: string; 
    token_type?: string;  
}