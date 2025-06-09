import { Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar-item',
  imports: [CommonModule],
  templateUrl: './navbar-item.component.html',
  styleUrl: './navbar-item.component.css'
})
export class NavbarItemComponent {
  @Input() href: string = '';
  @Input() label: string = '';
}
