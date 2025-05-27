import { Component,Input,OnChanges,OnInit, SimpleChanges } from '@angular/core';
import { NewsService } from '../services/news.service';
import { response } from 'express';

@Component({
  selector: 'app-news-list',
  standalone: false,
  templateUrl: './news-list.component.html',
  styleUrl: './news-list.component.scss',
})
export class NewsListComponent implements OnInit,OnChanges{

  @Input() searchTerm:string="";
  @Input() category:string="";
  @Input() showFavorites:boolean=false;

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
  if (changes['showFavorites']) {
    if (this.showFavorites) {
      this.loadFavorites();
    } else {
      this.loadNews(); 
    }
  }

  if (changes['category'] && !this.showFavorites) {
    if (this.category) {
      this.fetchNewsByCategory();
    } else {
      this.fetchDefaultNews(); 
    }
  }

  if (changes['searchTerm'] && !this.showFavorites) {
    this.filterNews();
  }
}
loadNews() {
    this.newsService.getNews().subscribe((response) => {
        this.news = response.articles.filter((item: any) => item.urlToImage && item.author);
        this.filteredNews = [...this.news];
        this.setPage(0, this.rowsPerPage);
    });
}

handleFavoriteClick(event: MouseEvent, item: any): void {
  const el = event.target as HTMLElement;

  this.animateHeart(el); 
  this.toggleFavorite(item); 
}

private animateHeart(el: HTMLElement): void {
  el.classList.add('clicked');

  setTimeout(() => {
    el.classList.remove('clicked');
  }, 800); 

  
  el.classList.toggle('active');
}

loadFavorites() {
    this.newsService.getFavoritesFromBackend().subscribe(favoritesData => {
        this.news = favoritesData.map((fav: any) => ({
            title: fav.title,
            url: fav.url,
            urlToImage: 'https://via.placeholder.com/300x150?text=Favorite',
            author: 'Favorite',
            description: 'Zapisany ulubiony artykuł.'
        }));
        this.filteredNews = [...this.news];
        this.setPage(0, this.rowsPerPage);
    });
}
toggleFavorite(item: any): void {
  this.newsService.addToFavoritesBackend(item.title, item.url,item.urlToImage);
}

  fetchNewsByCategory(): void {
    this.newsService.getNewsByCategory(this.category).subscribe(response => {
      this.news = response.articles.filter((item: any) => item.urlToImage && item.author);
      this.filteredNews = [...this.news];
      this.paginate({ first: 0, rows: this.rowsPerPage });
    });
  }

    fetchDefaultNews(): void {
    this.newsService.getNews().subscribe(response => {
      this.news = response.articles.filter((item: any) => item.urlToImage && item.author);
      this.filteredNews = [...this.news];
      this.paginate({ first: 0, rows: this.rowsPerPage });
    });
  }


  filterNews() {
    const term=this.searchTerm.toLowerCase();
    this.filteredNews=this.news.filter(item=>
      item.title?.toLowerCase().includes(term)||
      item.author?.toLowerCase().includes(term)
    );
    this.paginate({ first: 0, rows: this.rowsPerPage });
  }

}
