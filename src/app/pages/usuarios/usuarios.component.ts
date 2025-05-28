import { Component, inject, OnInit, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { User, UsersService } from '../../services/users/users.service';
import { AddUserFormComponent } from '../../components/add-user-form/add-user-form.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteUserDialogComponent } from '../../components/delete-user-dialog/delete-user-dialog.component';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-usuarios',
  imports: [MatTableModule, MatIconModule, AddUserFormComponent],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'email', 'acciones'];
  usersSignal = signal<User[]>([])
  usersService = inject(UsersService)
  readonly dialog = inject(MatDialog);

  ngOnInit(): void {
    this.loadUsers()
  }

  loadUsers() {
    this.usersService.getUsuarios().subscribe({
      next: (usuarios) => {
        this.usersSignal.set(usuarios)
      },
      error: (error) => {
        console.error('Error:', error)
      }
    })
  }

  editUser(user: User) {
    const newName = prompt('Editar nombre del usuario:', user.nombre);
    const newEmail = prompt('Editar email del usuario:', user.email);
    const newRol = prompt('Editar rol del usuario:', user.rolId.toString());

    if (
      newName && newEmail && newRol &&
      (newName !== user.nombre || newEmail !== user.email || newRol !== user.rolId.toString())
    ) {
      const updatedUser = {
        ...user,
        nombre: newName.trim(),
        email: newEmail.trim(),
        rol: parseInt(newRol)
      };

      this.usersService.updateUsuario(user.id, updatedUser).subscribe({
        next: (response) => {
          console.log('Usuario actualizado:', response);
          this.loadUsers();
        },
        error: (error) => {
          console.error('Error al actualizar usuario:', error);
        }
      });
    }
  }

  deleteUser(id: number, nombre: string) {
    const dialogRef = this.dialog.open(DeleteUserDialogComponent, {
      width: '400px',
      data: { userId: id, userName: nombre }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.usersService.deleteUsuario(id).subscribe({
          next: (response) => {
            console.log('Usuario eliminado:', response);
            this.loadUsers();
          },
          error: (error) => {
            console.error('Error al eliminar usuario:', error);
          }
        })
      }
    })
  }
}
