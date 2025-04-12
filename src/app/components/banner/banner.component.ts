import { Component, OnInit } from '@angular/core';
import { NewsService } from '../services/news.service';

@Component({
  selector: 'app-banner',
  standalone: false,
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss'
})
export class BannerComponent implements OnInit{

  allNews:any[]=[];
  images:any[]=[];

  constructor(private newsService:NewsService){}

  ngOnInit(): void {
    this.newsService.getRandomBannerImage(20).subscribe((articles) => {
      const valid = articles.filter(item => this.isValidImageUrl(item.urlToImage));
      const unique=this.getUniqueArticlesByUrl(valid);
      this.allNews=unique;
      this.loadBannerImages();
      })
  }
  getUniqueArticlesByUrl(articles: any[]):any[] {
    const seen=new Set();
    return articles.filter(article=>{
      const id=article.url;
      if(seen.has(id)){
        return false;
      }else{
        seen.add(id);
        return true;
      }
    })
  }

  loadBannerImages(): void {
    this.images = this.allNews.slice(0, 5); 
  }

  removeImage(index: number): void {
    this.images.splice(index, 1); 
    const remaining = 5 - this.images.length;
    if (remaining > 0 && this.allNews.length > this.images.length) {
      const nextImages = this.allNews.slice(this.images.length, this.images.length + remaining);
      this.images = [...this.images, ...nextImages];
    }
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





}
