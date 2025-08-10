import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Prescription } from '../../../interfaces/prescription';
import { FormFieldComponent } from '../form-field/form-field.component';
import { ButtonComponent } from '../../button/button.component';

@Component({
  selector: 'app-prescription-form',
  templateUrl: './prescription-form.component.html',
  styleUrls: ['./prescription-form.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, FormFieldComponent, ButtonComponent]
})
export class PrescriptionFormComponent implements OnChanges {
  @Input() initialData: Prescription | null = null;
  @Output() submitForm = new EventEmitter<Partial<Prescription>>();
  @Output() cancel = new EventEmitter<void>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      medication_details: ['', Validators.required],
      instructions: ['', Validators.required],
      precautions: ['', Validators.required],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialData']) {
      if (this.initialData) {
        this.form.patchValue(this.initialData);
      } else {
        this.form.reset();
      }
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.submitForm.emit(this.form.value);
      this.form.reset();
    } else {
      this.form.markAllAsTouched();
    }
  }

  onCancel() {
    this.cancel.emit();
  }
}
