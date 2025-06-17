import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar-menu-item',
  imports: [RouterModule, CommonModule],
  templateUrl: './sidebar-menu-item.component.html',
  styleUrls: ['./sidebar-menu-item.component.css']
})
export class SidebarMenuItemComponent {
  @Input() route: string = '';
  @Input() label: string = '';
  @Input() icon: string = '';
}
