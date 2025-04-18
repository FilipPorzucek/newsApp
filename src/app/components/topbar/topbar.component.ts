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

  @Output() searchChange=new EventEmitter<string>();
  @Output() toggleSidebar=new EventEmitter<string>();

  onSearch(){
    this.searchChange.emit(this.searchTerm);
  }

}
