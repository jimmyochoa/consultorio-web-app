import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { FormFieldComponent } from "../form-field/form-field.component";
import { DropdownComponent } from "../../dropdown/dropdown.component";
import { Appointment } from '../../../interfaces/appointment';

@Component({
  selector: 'app-appointment-form',
  imports: [FormFieldComponent, DropdownComponent, ReactiveFormsModule],
  templateUrl: './appointment-form.component.html',
  styleUrl: './appointment-form.component.css'
})
export class AppointmentFormComponent implements OnChanges {
  @Input() patients: any[] = [];
  @Input() initialData: any = null;
  @Output() submitForm = new EventEmitter<Appointment>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      doctor_id: JSON.parse(localStorage.getItem('user') || '{}')?.id,
      patient_id: ['', Validators.required],
      start_time: ['', [Validators.required, this.noPastDateValidator]],
      end_time: ['', [Validators.required, this.noPastDateValidator]],
      reason: ['', Validators.required]
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
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      this.form.patchValue({ doctor_id: user?.id });

      this.submitForm.emit(this.form.value);
      this.form.reset();
    } else {
      this.form.markAllAsTouched();
    }
  }

  get patientOptions() {
    return this.patients.map(p => ({
      label: p.first_name + ' ' + p.last_name,
      value: p.id
    }));
  }

  noPastDateValidator(control: AbstractControl): ValidationErrors | null {
    const inputDate = new Date(control.value);
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    if (inputDate < todayStart) {
      return { pastDate: true };
    }

    return null;
  }
}