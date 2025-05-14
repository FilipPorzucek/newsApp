import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewsListComponent } from './components/news-list/news-list.component';
import { HomeComponent } from './views/home/home.component';
import { providePrimeNG } from 'primeng/config';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PrimengModule } from './shared/primeng/primeng.module';

import { FormsModule } from '@angular/forms';
import MyBluePreset from './themes/blue-presets';
import { BannerComponent } from './components/banner/banner.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AuthComponent } from './components/auth/auth.component';
import { LoginFormComponent } from './components/auth/login-form/login-form.component';
import { RegisterFormComponent } from './components/auth/register-form/register-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NewsListComponent,
    HomeComponent,
    BannerComponent,
    TopbarComponent,
    SidebarComponent,
    AuthComponent,
    LoginFormComponent,
    RegisterFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule, 
    PrimengModule,
   FormsModule,
   ReactiveFormsModule
  ],
  providers: [
    providePrimeNG({
      theme: {
        preset: MyBluePreset
      }
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
