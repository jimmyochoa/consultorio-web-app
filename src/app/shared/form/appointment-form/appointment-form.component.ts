import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { FormFieldComponent } from "../form-field/form-field.component";
import { DropdownComponent } from "../../dropdown/dropdown.component";

@Component({
  selector: 'app-appointment-form',
  imports: [FormFieldComponent, DropdownComponent, ReactiveFormsModule],
  templateUrl: './appointment-form.component.html',
  styleUrl: './appointment-form.component.css'
})
export class AppointmentFormComponent {
  @Input() patients: any[] = [];
  @Output() submitForm = new EventEmitter<any>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      pacienteId: ['', Validators.required],
      fechaHora: ['', Validators.required],
      razon: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.submitForm.emit(this.form.value);
    }
  }

  get patientOptions() {
    return this.patients.map(p => ({
      label: p.nombres + ' ' + p.apellidos,
      value: p.id
    }));
  }
}
