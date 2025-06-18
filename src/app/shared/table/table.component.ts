import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  imports: [CommonModule],
  templateUrl: './table.component.html'
})
export class TableComponent<T> {
  @Input() data: T[] = [];
  @Input() columns: { field: keyof T | string; header: string }[] = [];
  @Input() showActions = true;

  @Output() edit = new EventEmitter<T>();
  @Output() delete = new EventEmitter<T>();

  // 👇 Aquí agregas el método getValue
  getValue(item: T, field: keyof T | string): any {
    const keys = (field as string).split('.');
    return keys.reduce((acc: any, key) => acc?.[key], item as any);
  }
}
