import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';

const routes:Routes=[
  {path:'home',component: HomeComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' }


]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
