import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  drawerVisible:boolean=false;
  searchTerm:string="";
  selectedCategory:string="";


  onSearch(term:string){
this.searchTerm=term;
this.selectedCategory='';
  }

  onCategorySelected(category: string){
    this.selectedCategory=category;
    this.searchTerm='';
  }

 

}
