import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../../../shared/models/login-request.model';

@Component({
  selector: 'app-login-form',
  standalone: false,
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent implements OnInit{
 

  loginForm!:FormGroup;

  email: string = '';
  password: string = '';
  constructor(private fb:FormBuilder, private authService:AuthService){}

   ngOnInit(): void {
    this.loginForm=this.fb.group({
      email:['',Validators.required,],
      password:['',Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const loginData: LoginRequest = this.loginForm.value;
    this.authService.login(loginData).subscribe(user => {
      console.log('User logged in:', user);
      
    });
  }

   

}
