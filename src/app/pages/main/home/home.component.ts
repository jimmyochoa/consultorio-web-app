import { Component } from '@angular/core';
import { CarouselSlideComponent } from '../../../shared/carousel-slide/carousel-slide.component';
import { FeaturedItemComponent } from '../../../shared/featured-item/featured-item.component';

@Component({
  selector: 'app-home',
  imports: [CarouselSlideComponent, FeaturedItemComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
