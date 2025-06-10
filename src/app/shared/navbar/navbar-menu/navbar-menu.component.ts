import { Component } from '@angular/core';
import { NavbarItemComponent } from '../navbar-item/navbar-item.component';
import { NavbarToggleComponent } from '../navbar-toggle/navbar-toggle.component';
import { ButtonComponent } from '../../button/button.component';

@Component({
  selector: 'app-navbar-menu',
  imports: [NavbarItemComponent, NavbarToggleComponent, ButtonComponent],
  templateUrl: './navbar-menu.component.html',
  styleUrl: './navbar-menu.component.css'
})
export class NavbarMenuComponent {

}
