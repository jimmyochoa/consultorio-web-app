import { Component, Input, forwardRef, Optional} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, ControlContainer, FormGroup, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dropdown',
  imports: [CommonModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true
    }
  ],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css'
})
export class DropdownComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() options: { label: string, value: any }[] = [];
  @Input() formControlName!: string;

  constructor(@Optional() private controlContainer: ControlContainer) {}


  value: any;
  onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  handleChange(value: any) {
    this.value = value;
    this.onChange(this.value);
  }

  get formControl(): FormControl | null {
    if (!this.controlContainer || !this.formControlName) return null;
    const formGroup = this.controlContainer.control as FormGroup;
    return formGroup.get(this.formControlName) as FormControl;
  }

  get showError(): boolean {
    const control = this.formControl;
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  get errorMessage(): string {
    const control = this.formControl;
    if (!control || !control.errors) return '';
    if (control.errors['required']) return 'Este campo es obligatorio';
    return 'Opción inválida';
  }

}