import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { LoginFormComponent } from './components/auth/login-form/login-form.component';
import { RegisterFormComponent } from './components/auth/register-form/register-form.component';

const routes:Routes=[
  {path:'home',component: HomeComponent},
  {path:'login',component:LoginFormComponent},
  {path: 'register',component:RegisterFormComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' }


]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
