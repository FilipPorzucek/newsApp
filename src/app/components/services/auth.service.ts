import { Injectable } from '@angular/core';
import { User } from '../../shared/models/user.model';
import { delay, Observable, of } from 'rxjs';
import { LoginRequest } from '../../shared/models/login-request.model';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
constructor(private http:HttpClient){
    this.loadSessionData();
}

  private loggedIn=false;
  private user:User | null=null;
  private storageKey = 'authData';
  private apiUrl="http://127.0.0.1:8000"
    private apiUrl2="http://127.0.0.1:80/register_proxy.php"

 login(data: LoginRequest): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, data).pipe(
      tap(response => {
        this.loggedIn = true;
        this.user = response; 
        sessionStorage.setItem(this.storageKey,JSON.stringify(response));
      })
    );
  }

   logout(){
    this.loggedIn=false;
    this.user=null;
    sessionStorage.removeItem(this.storageKey);
  }

  private loadSessionData(): void {
    const data = sessionStorage.getItem(this.storageKey);
    if (data) {
      this.user = JSON.parse(data);
      this.loggedIn = true;
    }
  }

 getToken(): string | null {
  return this.user?.token ?? null;
}


 register(data: any): Observable<User> {
    return this.http.post<User>(`${this.apiUrl2}`, data);
  }

 
  isLoggedIn(){
    return this.loggedIn;
  }

  getUser(){
    return this.user;
  }

}
