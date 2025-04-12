import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  searchTerm:string="";

  onSearch(term:string){
this.searchTerm=term;
  }

}
