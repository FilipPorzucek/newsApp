import { Component,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Input() visible:boolean=false;
  @Output() visibleChange = new EventEmitter<boolean>();

  selectCategory(category: string) {
   

  }

}
