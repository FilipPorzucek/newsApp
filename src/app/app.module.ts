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

@NgModule({
  declarations: [
    AppComponent,
    NewsListComponent,
    HomeComponent,
    BannerComponent,
    TopbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule, 
    PrimengModule,
   FormsModule
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
