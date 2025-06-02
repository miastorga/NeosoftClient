import { Component, inject, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Roles, RolesService } from '../../services/roles/roles.service';
import { AddRolesFormComponent } from '../../components/add-roles-form/add-roles-form.component';

@Component({
  selector: 'app-roles',
  imports: [MatTableModule, MatIconModule, AddRolesFormComponent],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'acciones'];
  rolesSignal = signal<Roles[]>([])
  rolesService = inject(RolesService)


  ngOnInit(): void {
    this.loadRoles()
  }

  loadRoles() {
    this.rolesService.getRoles().subscribe({
      next: (roles) => {
        this.rolesSignal.set(roles)
      },
      error: (error) => {
        console.error('Error:', error)
      }
    })
  }

  editUser(role: Roles) {
    const newName = prompt('Editar nombre del usuario:', role.nombre);

    if (newName && newName.trim() !== '' && newName !== role.nombre) {
      const updatedUser = {
        ...role,
        nombre: newName.trim()
      };

      this.rolesService.updateRole(role.id, updatedUser).subscribe({
        next: (role) => {
          console.log('Usuario actualizado:', role);
          this.loadRoles();
        },
        error: (error) => {
          console.error('Error al actualizar usuario:', error);
        }
      });
    }
  }

  deleteUser(id: number, nombre: string) {
    const confirmacion = confirm(`¿Estás seguro de que deseas eliminar al rol"${nombre}"?`);

    if (confirmacion) {
      this.rolesService.deleteRole(id).subscribe({
        next: (response) => {
          console.log('Usuario eliminado:', response);
          this.loadRoles();
        },
        error: (error) => {
          console.error('Error al eliminar usuario:', error);
        }
      });
    }
  }

}
