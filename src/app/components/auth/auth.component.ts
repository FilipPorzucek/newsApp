import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: false,
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {

  dialogVisible=false;
  showLogin=false;
  showRegister=false;
  test=true;

  constructor(private authService:AuthService,private router:Router){}

  navigateToLogin(){
    this.dialogVisible=false;
    this.router.navigate(['/login']);
  }

  navigateToRegister(){
    this.dialogVisible=false;
    this.router.navigate(['/register']);
  }

  isLoggedIn(){
    return this.authService.isLoggedIn();
  }

  getUser(){
    return this.authService.getUser();
  }

  logout(){
    this.authService.logout();
    this.showLogin=false;
    this.showRegister=false;
  }

  openDialog() {
    this.dialogVisible = true;
  }
  onLoginSuccess() {
  this.dialogVisible = false;
  this.showLogin = false;
}

onRegisterSuccess() {
  this.dialogVisible = false;
  this.showRegister = false;
}

onDialogHide() {
  this.showLogin = false;
  this.showRegister = false;
}


}
