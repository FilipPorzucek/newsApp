import { Component, ViewChild } from '@angular/core';
import { NewsListComponent } from '../../components/news-list/news-list.component';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {

@ViewChild(NewsListComponent) newsList!:NewsListComponent;

onRefreshNews(){
  this.newsList.updateNewsFromBackend();
}

  drawerVisible:boolean=false;
  searchTerm:string="";
  selectedCategory:string="";
  showFavorites:boolean=false;

  onSearch(term:string){
this.searchTerm=term;
this.selectedCategory='';
this.showFavorites=false;
  }

  onCategorySelected(category: string){
    this.selectedCategory=category;
    this.searchTerm='';
    this.showFavorites=false;
  }

 onFavoritesToggle(state: boolean) {
    this.showFavorites = state;
    console.log('Favorites toggled, current state:', this.showFavorites);
  }

resetToHome() {
  this.newsList.refreshNewsForHome();
  this.searchTerm = '';
  this.showFavorites = false;
  this.selectedCategory = '';
}

}
