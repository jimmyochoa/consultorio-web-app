import { Component, EventEmitter, Input, Output,OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormFieldComponent } from "../form-field/form-field.component";
import { DropdownComponent } from "../../dropdown/dropdown.component";
import { Patient } from "../../../interfaces/patient"; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-patient-form',
  imports: [FormFieldComponent, DropdownComponent, ReactiveFormsModule],
  templateUrl: './patient-form.component.html',
  styleUrl: './patient-form.component.css'
})
export class PatientFormComponent implements OnChanges {
 @Output() submitForm = new EventEmitter<Patient>();
 @Input() initialData: Patient | null = null;

  form: FormGroup;
  bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  get bloodTypesOptions() {
    return this.bloodTypes.map(type => ({
      label: type,
      value: type
    }));
  }

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      sexo: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      celular: ['', Validators.required],
      tipoSangre: ['', Validators.required],
    });
  }

  onSubmit() {
      if (this.form.valid) {
      const formValue = this.form.value;

      // Si estamos creando un nuevo paciente, agregar la fecha actual
      if (!this.initialData) {
        formValue.fechaRegistro = new Date().toISOString().split('T')[0]; // formato YYYY-MM-DD
      }

      this.submitForm.emit(formValue);
      this.form.reset(); 
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.initialData) {
      this.form.patchValue(this.initialData);
    } else {
      this.form.reset();
    }
  }
}