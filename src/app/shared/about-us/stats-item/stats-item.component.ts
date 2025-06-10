import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stats-item',
  templateUrl: './stats-item.component.html',
  styleUrls: ['./stats-item.component.css'],
})
export class StatsItemComponent {
  @Input() icon!: string;
  @Input() number!: string | number;
  @Input() label!: string;
}
