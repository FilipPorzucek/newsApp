import { Component,Input,Output,EventEmitter,ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class SidebarComponent {
  @Input() visible:boolean=false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() categorySelected=new EventEmitter<string>();

  selectCategory(category: string) {
this.categorySelected.emit(category);
  }
  checked: boolean = false;
  onToggleDarkMode(){
    if(this.checked){
      document.body.classList.add('dark-mode');
    }else{
      document.body.classList.remove('dark-mode')
    }
  }

}
