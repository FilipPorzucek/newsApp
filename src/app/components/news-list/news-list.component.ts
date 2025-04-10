import { Component,OnInit } from '@angular/core';
import { NewsService } from '../services/news.service';
import e, { response } from 'express';


@Component({
  selector: 'app-news-list',
  standalone: false,
  templateUrl: './news-list.component.html',
  styleUrl: './news-list.component.scss'
})
export class NewsListComponent implements OnInit{
  news:any[]=[];
  pagedNews:any[]=[];
  rowsPerPage = 12;

  goTo(url:any){
    window.open(url, '_blank');
  }

  constructor(private newsService:NewsService){}

  hideItem(item: any): void {
    item.visible = false;
  }

  ngOnInit(): void {
      this.newsService.getNews().subscribe((response)=>{
        this.news = response.articles.filter((item: any) => item.urlToImage && item.author);
this.setPage(0, this.rowsPerPage);
      })

      
  }

  paginate(event: any) {
    const start = event.first;
    const end = start + event.rows;
    this.setPage(start, end);
  }

  setPage(start:number,end:number){
    this.pagedNews=this.news.slice(start,end);

  }


}
