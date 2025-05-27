import { Component, EventEmitter, Output } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-topbar',
  standalone: false,
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss',
 
  
})
export class TopbarComponent {

  searchTerm:string="";
  showFavorites=false;

  @Output() searchChange=new EventEmitter<string>();
  @Output() toggleSidebar=new EventEmitter<string>();
  @Output() userIconClicked =new EventEmitter<void>();
  @Output() favoritesToggle = new EventEmitter<boolean>();
  @Output() goHome= new EventEmitter<void>();

  onSearch(){
    this.searchChange.emit(this.searchTerm);
  }

  onUserIconClick() {
    this.userIconClicked.emit();
   }

   toggleFavorites() {
  this.showFavorites = !this.showFavorites;
  this.favoritesToggle.emit(this.showFavorites);
   console.log('Favorites button clicked');
}

}
