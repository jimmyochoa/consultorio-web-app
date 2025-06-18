import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
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
      id: [null],
      pacienteId: ['', Validators.required],
      fechaHora: ['', Validators.required],
      razon: ['', Validators.required]
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
    }
  }

  get patientOptions() {
    return this.patients.map(p => ({
      label: p.nombres + ' ' + p.apellidos,
      value: p.id
    }));
  }
}