import { Component,Input,OnChanges,OnInit, SimpleChanges } from '@angular/core';
import { NewsService } from '../services/news.service';
import e, { response } from 'express';
import { first } from 'rxjs';


@Component({
  selector: 'app-news-list',
  standalone: false,
  templateUrl: './news-list.component.html',
  styleUrl: './news-list.component.scss'
})
export class NewsListComponent implements OnInit,OnChanges{

  @Input() searchTerm:string="";

  news:any[]=[];
  pagedNews:any[]=[];
  filteredNews:any=[];
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
        this.filteredNews=[...this.news];
this.setPage(0, this.rowsPerPage);
      })

      
  }

  paginate(event: any) {
    const start = event.first;
    const end = start + event.rows;
    this.setPage(start, end);
  }

  setPage(start:number,end:number){
    this.pagedNews = this.filteredNews.slice(start, end); 

  }

  ngOnChanges(changes: SimpleChanges): void {
      if(changes['searchTerm']){
        this.filterNews();
      }
  }
  filterNews() {
    const term=this.searchTerm.toLowerCase();
    this.filteredNews=this.news.filter(item=>
      item.title?.toLowerCase().includes(term)||
      item.author?.toLowerCase().includes(term)
    );
    this.paginate({first:0,rows:12});
  }


}
