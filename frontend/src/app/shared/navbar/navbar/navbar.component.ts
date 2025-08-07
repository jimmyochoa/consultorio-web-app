import { Component } from '@angular/core';
import { NavbarBrandComponent } from '../navbar-brand/navbar-brand.component';
import { NavbarMenuComponent } from '../navbar-menu/navbar-menu.component';

@Component({
  selector: 'app-navbar',
  imports: [NavbarBrandComponent, NavbarMenuComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

}
