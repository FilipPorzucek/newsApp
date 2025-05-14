import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder,FormGroup,Validators,AbstractControl,ValidationErrors } from '@angular/forms';
import { RegisterRequest } from '../../../shared/models/register-request.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-form',
  standalone: false,
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent implements OnInit{
   registerForm!: FormGroup;
 name: string = '';
  email: string = '';
  password: string = '';
  repeatPassword: string = '';
  dateOfBirth: Date | string = '';

  constructor( private fb:FormBuilder,private authService:AuthService,private rouetr:Router){};

  ngOnInit(){
    this.registerForm=this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      repeatPassword: ['', Validators.required],
      dateOfBirth: ['', Validators.required]
    },{ validators: this.passwordsMatchValidator } );
  }

passwordsMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const repeatPassword = group.get('repeatPassword')?.value;
    return password === repeatPassword ? null : { passwordsMismatch: true };
  }

  formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); 
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`; 
}

onSubmit(){
  if(this.registerForm.invalid){
    this.registerForm.markAllAsTouched();
    return;
  }

  const formValue = this.registerForm.value;

  const registerData: RegisterRequest = {
      name: formValue.name,
      email: formValue.email,
      password: formValue.password,
       dateOfBirth: this.formatDate(formValue.dateOfBirth)
    };

    

    this.authService.register(registerData).subscribe(user => {
      console.log('User registered successfully:', user);
      this.rouetr.navigate(['/home']);
    });


}
  
}
    








