import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Roles, RolesService } from '../../services/roles/roles.service';

@Component({
  selector: 'app-add-roles-form',
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './add-roles-form.component.html',
  styleUrl: './add-roles-form.component.css'
})
export class AddRolesFormComponent {
  @Output() roleCreated = new EventEmitter<void>();
  rolesService = inject(RolesService)
  message = ''

  rolesForm = new FormGroup({
    nombre: new FormControl('', [
      Validators.required,
      Validators.maxLength(50)
    ])
  })

  get nombre() { return this.rolesForm.get('nombre')!; }

  addRole() {
    if (this.rolesForm.valid) {
      const formValue = this.rolesForm.value;
      const roleData: Omit<Roles, 'id'> = {
        nombre: formValue.nombre!,
      };
      this.rolesService.createRole(roleData).subscribe({
        next: (response) => {
          this.message = `El Rol ${response.nombre} creado exitosamente`
          this.roleCreated.emit()
          this.rolesForm.reset();
        },
        error: (error) => {
          console.error('Error creating user:', error);
        }
      })
    } else {
      this.rolesForm.markAllAsTouched();
    }
  }
}
