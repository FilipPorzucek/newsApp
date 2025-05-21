import { Component } from '@angular/core';
import { NewsService } from '../components/services/news.service';

@Component({
  selector: 'app-favorites-list',
  standalone: false,
  templateUrl: './favorites-list.component.html',
  styleUrl: './favorites-list.component.scss'
})
export class FavoritesListComponent {
 favorites: any[] = [];

  constructor(private newsService: NewsService) {}

ngOnInit(): void {
  this.newsService.getFavoritesFromBackend().subscribe(favoritesData => {
    this.favorites = favoritesData;
    console.log('Favorites Loaded from backend:', this.favorites);
  }, error => {
    console.error('Error fetching favorites:', error);
  });
}

  goTo(url: string) {
    window.open(url, '_blank');
  }

}
