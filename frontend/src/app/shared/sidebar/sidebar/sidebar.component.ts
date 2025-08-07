import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarHeaderComponent } from '../sidebar-header/sidebar-header.component';
import { SidebarMenuComponent } from '../sidebar-menu/sidebar-menu.component';

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule, SidebarHeaderComponent, SidebarMenuComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
}