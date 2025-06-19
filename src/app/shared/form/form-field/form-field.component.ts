import { Component, Input, forwardRef, Optional } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, ControlContainer, FormControl, FormGroupDirective, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-form-field',
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormFieldComponent),
      multi: true
    }
  ],
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.css',
  viewProviders: [    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormFieldComponent),
      multi: true
    }],
})
export class FormFieldComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() required: boolean = false;
  @Input() formControlName!: string; 

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

  handleInput(event: any) {
    this.value = event.target.value;
    this.onChange(this.value);
  }

  constructor(@Optional() private controlContainer: ControlContainer) {}

  get formControl(): FormControl | null {
    const form = this.controlContainer?.control as FormGroup;
    return form?.get(this.formControlName) as FormControl;
  }

  get showError(): boolean {
    const control = this.formControl;
    return !!control && control.invalid && (control.touched || control.dirty);
  }

  get errorMessage(): string {
    const control = this.formControl;
    if (!control || !control.errors) return '';
    if (control.errors['required']) return 'Este campo es obligatorio';
    if (control.errors['email']) return 'Correo electrónico inválido';
    if (control.errors['pattern']) return 'Formato inválido';
    if (control.errors['futureDate']) return 'La fecha no puede ser futura';
    return 'Campo inválido';
  }
}
