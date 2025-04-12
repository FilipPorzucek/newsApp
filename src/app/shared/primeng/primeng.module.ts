import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { CarouselModule } from 'primeng/carousel';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports:[
    CardModule,
    ButtonModule,
    PaginatorModule,
    CarouselModule
  ]
})
export class PrimengModule { }
