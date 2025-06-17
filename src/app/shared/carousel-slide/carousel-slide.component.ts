import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-carousel-slide',
  imports: [],
  templateUrl: './carousel-slide.component.html',
  styleUrl: './carousel-slide.component.css'
})
export class CarouselSlideComponent {
  @Input() imgSrc!: string;
  @Input() title!: string;
  @Input() description!: string;
  @Input() active: boolean = false;
}
