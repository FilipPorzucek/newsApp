import { Component,Input,OnChanges,OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { NewsService } from '../services/news.service';
import { response } from 'express';
import { forkJoin } from 'rxjs';
import { Paginator } from 'primeng/paginator';
import { AuthService } from '../services/auth.service';
import { MessageService } from 'primeng/api';

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
  @ViewChild('paginator') paginator!:Paginator;

  news:any[]=[];
  pagedNews:any[]=[];
  filteredNews:any=[];
  rowsPerPage = 12;
  hasLoadedFromSession = false;

  goTo(url:any){
    window.open(url, '_blank');
  }

  constructor(private newsService:NewsService,
    private authService:AuthService,
    private messageService:MessageService
  ){}

  hideItem(item: any): void {
    item.visible = false;
  }

updateNewsFromBackend(): void {
  if (this.authService.isLoggedIn()) {
    forkJoin([
      this.newsService.updateNews(),
      this.newsService.getFavoritesFromBackend()
    ]).subscribe(([updatedNews, favorites]) => {
      console.log('🔄 ODEBRANE NEWSY Z BACKENDU (z updateNews):', updatedNews);
      this.handleUpdatedNews(updatedNews, favorites);
    });
  } else {
    this.newsService.updateNews().subscribe(updatedNews => {
      console.log('🔄 ODEBRANE NEWSY Z BACKENDU (bez zalogowania):', updatedNews);
      this.handleUpdatedNews(updatedNews, []);
    });
  }
}



refreshNewsForHome(): void {
  this.news = [];
  this.filteredNews = [];
  this.pagedNews = [];
  
  if (this.authService.isLoggedIn()) {
    forkJoin([
      this.newsService.updateNews(),
      this.newsService.getFavoritesFromBackend()
    ]).subscribe(([updatedNews, favorites]) => {
      console.log('🏠 ODEBRANE NEWSY DLA HOME:', updatedNews);
      this.handleUpdatedNews(updatedNews, favorites);
    });
  } else {
    this.newsService.updateNews().subscribe(updatedNews => {
      console.log('🏠 ODEBRANE NEWSY DLA HOME (bez zalogowania):', updatedNews);
      this.handleUpdatedNews(updatedNews, []);
    });
  }
}


private handleUpdatedNews(updatedNews: any[], favorites: any[]): void {
  const favoriteUrls = favorites.map(fav => fav.url);

  const updatedMap = new Map(updatedNews.map(item => [item.id, {
    ...item,
    isFavorite: favoriteUrls.includes(item.url)
  }]));

  const mergedNews = [
    ...Array.from(updatedMap.values()),
    ...this.news.filter(n => !updatedMap.has(n.id))
  ];

  this.news = mergedNews;
  this.filteredNews = [...this.news];

  this.paginator.changePage(0);      
  this.setPage(0, this.rowsPerPage);  

  sessionStorage.setItem('updatedNews', JSON.stringify(this.news));
}

ngOnInit(): void {
  const storedNews = sessionStorage.getItem('updatedNews');
  console.log('Z CZYTANEGO SESSION:', storedNews);

  if (storedNews) {
    this.hasLoadedFromSession = true;
    this.news = JSON.parse(storedNews);
    this.filteredNews = [...this.news];
    this.setPage(0, this.rowsPerPage);

   
    this.updateNewsFromBackend();

    return;
  }

  
  forkJoin([
    this.newsService.getNews(),
    this.newsService.getFavoritesFromBackend()
  ])
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
      const sessionStored = sessionStorage.getItem('updatedNews');
      if (sessionStored) {
        this.news = JSON.parse(sessionStored);
        this.filteredNews = [...this.news];
        this.setPage(0, this.rowsPerPage);
        return;
      } else {
        this.loadNewsWithFavorites();
      }
    }
  }

  if (changes['category'] && changes['category'].currentValue !== changes['category'].previousValue && !this.showFavorites) {
    this.fetchNewsByCategory();
  }

  if (changes['searchTerm'] && !this.showFavorites) {
    this.filterNews();
  }
}
loadNewsWithFavorites(): void {
  if (this.hasLoadedFromSession) return; 
  forkJoin([
    this.newsService.getNews(),
    this.newsService.getFavoritesFromBackend()
  ]).subscribe(([newsData, favorites]) => {
    const favoriteUrls = favorites.map(fav => fav.url);

    this.news = newsData
      .filter((item: any) => item.urlToImage && item.author)
      .map((item: any) => ({
        ...item,
        isFavorite: favoriteUrls.includes(item.url)
      }));

    this.filteredNews = [...this.news];
    this.setPage(0, this.rowsPerPage);
  });
}
handleFavoriteClick(event: MouseEvent, item: any): void {
  const el = event.target as HTMLElement;
    if(!this.authService.isLoggedIn()){
    this.messageService.add({
      severity:'warn',
      summary:'Brak dostępu',
      detail:"Zaloguj się lub utwórz konto"
    });
    return
  }

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

  this.newsService.addToFavoritesBackend(item.id);
}

fetchNewsByCategory(): void {
  const stored = sessionStorage.getItem('updatedNews');
  const sessionNews = stored ? JSON.parse(stored) : [];

  this.newsService.getNewsByCategory(this.category).subscribe(response => {
    const categoryNews = response.filter((item: any) => item.urlToImage && item.author);

   
    const sessionIds = new Set(categoryNews.map((n: any) => n.id));
    const extraNews = sessionNews.filter((n: any) => n.category === this.category && !sessionIds.has(n.id));

  
    this.news = [...extraNews, ...categoryNews];
    this.filteredNews = [...this.news];
    this.paginate({ first: 0, rows: this.rowsPerPage });
  });
}

  fetchDefaultNews(): void {
    if (this.hasLoadedFromSession) return; 
  this.newsService.getNews().subscribe(response => {
    this.news = response.filter((item: any) => item.urlToImage && item.author);
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
