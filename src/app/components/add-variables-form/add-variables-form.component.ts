import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Variables, VariablesService } from '../../services/variables/variables.service';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-variables-form',
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './add-variables-form.component.html',
  styleUrl: './add-variables-form.component.css'
})
export class AddVariablesFormComponent {
  variableServices = inject(VariablesService)
  @Output() roleCreated = new EventEmitter<void>();
  message = ''

  variableForm = new FormGroup({
    nombre: new FormControl('', [
      Validators.required,
      Validators.maxLength(100)
    ]),
    valor: new FormControl('', [
      Validators.required,
      Validators.maxLength(100)
    ]),
    tipo: new FormControl('', [
      Validators.required
    ]),
  })

  get nombre() { return this.variableForm.get('nombre')!; }
  get valor() { return this.variableForm.get('valor')!; }
  get tipo() { return this.variableForm.get('tipo')!; }

  addvariable() {
    if (this.variableForm.valid) {
      const formValue = this.variableForm.value;
      const variableData: Omit<Variables, 'id'> = {
        nombre: formValue.nombre!,
        valor: formValue.valor!,
        tipo: formValue.tipo!
      };
      this.variableServices.createVariable(variableData).subscribe({
        next: (response) => {
          this.message = `variable ${response.nombre} creado exitosamente`
          this.roleCreated.emit()
          this.variableForm.reset();
        },
        error: (error) => {
          console.error('Error creating user:', error);
        }
      })
    } else {
      this.variableForm.markAllAsTouched();
    }
  }
}
