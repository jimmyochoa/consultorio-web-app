import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true, // si es standalone
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent<T> {
  @Input() data: T[] = [];
  @Input() columns: { field: keyof T | string; header: string }[] = [];
  @Input() showActions = true;
  @Input() pageSize = 5; // 👈 Tamaño de página configurable
  @Input() formatters?: { [field: string]: (value: any) => string };

  @Output() edit = new EventEmitter<T>();
  @Output() delete = new EventEmitter<T>();
  @Output() rowClick = new EventEmitter<T>();

  onRowClick(item: T) {
    this.rowClick.emit(item);
  }

  currentPage = 1;

  get totalPages(): number {
    return Math.ceil(this.data.length / this.pageSize);
  }

  get paginatedData(): T[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.data.slice(start, start + this.pageSize);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  getValue(item: T, field: keyof T | string): any {
    const keys = (field as string).split('.');
    const value = keys.reduce((acc: any, key) => acc?.[key], item as any);

    if (this.formatters && this.formatters[field as string]) {
      return this.formatters[field as string](value);
    }
    return value;
  }
}
