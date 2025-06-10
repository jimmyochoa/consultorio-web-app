import { Component } from '@angular/core';
import { IconBoxComponent } from '../../../shared/about-us/icon-box/icon-box.component';
import { ServiceItemComponent } from '../../../shared/about-us/service-item/service-item.component';
import { StatsItemComponent } from '../../../shared/about-us/stats-item/stats-item.component';
@Component({
  selector: 'app-about',
  imports: [IconBoxComponent, ServiceItemComponent, StatsItemComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

}
