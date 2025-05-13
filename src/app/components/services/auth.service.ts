import { Injectable } from '@angular/core';
import { User } from '../../shared/models/user.model';
import { delay, Observable, of } from 'rxjs';
import { LoginRequest } from '../../shared/models/login-request.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn=false;
  private user:User | null=null;

  login(data:LoginRequest):Observable<User>{
    this.loggedIn=true;
    this.user={
      email:data.email,
      name:"Mock User",
      dateOfBirth:"1990-01-01",
      token:"mock-token-12345"
    };
    return of(this.user).pipe(delay(500));
  }

  register(data:any):Observable<User>{
    this.loggedIn=true;
    this.user={
      email:data.email,
      name:data.name,
      dateOfBirth:data.dateOfBirth,
      token:'mock-token-67890'
    };
    return of(this.user).pipe(delay(500));
  }

  logout(){
    this.loggedIn=false;
    this.user=null;
  }

  isLoggedIn(){
    return this.loggedIn;
  }

  getUser(){
    return this.user;
  }

}
