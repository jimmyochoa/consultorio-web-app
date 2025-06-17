import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-featured-item',
  imports: [],
  templateUrl: './featured-item.component.html',
  styleUrl: './featured-item.component.css'
})
export class FeaturedItemComponent {
  @Input() iconClass!: string;
  @Input() title!: string;
  @Input() description!: string;
}
