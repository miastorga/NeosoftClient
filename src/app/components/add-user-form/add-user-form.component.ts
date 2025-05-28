import { Component, EventEmitter, inject, OnInit, Output, signal } from '@angular/core';

import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { User, UsersService } from '../../services/users/users.service';
import { Roles, RolesService } from '../../services/roles/roles.service';

@Component({
  selector: 'app-add-user-form',
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './add-user-form.component.html',
  styleUrl: './add-user-form.component.css'
})
export class AddUserFormComponent implements OnInit {
  @Output() userCreated = new EventEmitter<void>();
  usersService = inject(UsersService)
  rolesService = inject(RolesService)
  rolesSignal = signal<Roles[]>([])
  message = ''

  ngOnInit(): void {
    this.loadRoles()
  }

  loadRoles() {
    this.rolesService.getRoles().subscribe({
      next: (roles) => {
        this.rolesSignal.set(roles)
        console.log(this.rolesSignal())
      },
      error: (error) => {
        console.error('Error:', error)
        console.error('Error:', error.status)
      }
    })
  }

  userForm = new FormGroup({
    nombre: new FormControl('', [
      Validators.required,
      Validators.maxLength(100)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.maxLength(200)
    ]),
    rol: new FormControl(0, [
      Validators.required
    ]),
  })

  get nombre() { return this.userForm.get('nombre')!; }
  get email() { return this.userForm.get('email')!; }
  get rol() { return this.userForm.get('rol')!; }

  addUser() {
    if (this.userForm.valid) {
      const formValue = this.userForm.value;
      const userData: Omit<User, 'id'> = {
        nombre: formValue.nombre!,
        email: formValue.email!,
        rolId: formValue.rol!
      };
      this.usersService.createUsuario(userData).subscribe({
        next: (response) => {
          this.message = `usuario ${response.nombre} creado exitosamente`
          this.userCreated.emit()
          this.userForm.reset();
        },
        error: (error) => {
          console.error('Error creating user:', error);
        }
      })
    } else {
      this.userForm.markAllAsTouched();
    }
  }
}
