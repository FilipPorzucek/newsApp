import { Component, OnInit } from '@angular/core';
import { NewsService } from '../services/news.service';

@Component({
  selector: 'app-banner',
  standalone: false,
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss'
})
export class BannerComponent implements OnInit{

  images:any[]=[];

  constructor(private newsService:NewsService){}

  ngOnInit(): void {
      this.newsService.getRandomBannerImage().subscribe(images=>{
        this.images=images.filter((img:any)=>this.isValidImageUrl(img.urlToImage))
      })
  }
  isValidImageUrl(url: String): boolean {
   return !!url&&url.startsWith('http');
  }
  goTo(url: string): void {
    window.open(url, '_blank'); 
  }

  responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: '768px',
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1
    }
  ];


  removeImage(index:number) {
    this.images.splice(index, 1);
    }

}
