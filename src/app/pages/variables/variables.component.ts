import { Component, inject, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Variables, VariablesService } from '../../services/variables/variables.service';
import { AddVariablesFormComponent } from '../../components/add-variables-form/add-variables-form.component';

@Component({
  selector: 'app-variables',
  imports: [MatTableModule, MatIconModule, AddVariablesFormComponent],
  templateUrl: './variables.component.html',
  styleUrl: './variables.component.css'
})
export class VariablesComponent implements OnInit {
  ngOnInit(): void {
    this.loadVariables()
  }
  displayedColumns: string[] = ['nombre', 'valor', 'tipo', 'acciones'];
  variablesSignal = signal<Variables[]>([])
  variableSevice = inject(VariablesService)

  loadVariables() {
    this.variableSevice.getVariables().subscribe({
      next: (variables) => {
        this.variablesSignal.set(variables)
        console.log(this.variablesSignal())
      },
      error: (error) => {
        console.error('Error:', error)
      }
    })
  }

  editVariable(variable: Variables) {
    const newName = prompt('Editar nombre de la variable:', variable.nombre);
    const newValue = prompt('Editar valor de la variable:', variable.valor);
    const newType = prompt('Editar tipo de la variable:', variable.tipo);

    if (
      newName !== null && newValue !== null && newType !== null &&
      (newName.trim() !== variable.nombre || newValue.trim() !== variable.valor.toString() || newType.trim() !== variable.tipo)
    ) {
      const updatedVariable: Variables = {
        ...variable,
        nombre: newName.trim(),
        valor: newValue.trim(),
        tipo: newType.trim()
      };

      this.variableSevice.updateVariable(variable.id, updatedVariable).subscribe({
        next: (response) => {
          console.log('Variable actualizada:', response);
          this.loadVariables();
        },
        error: (error) => {
          console.error('Error al actualizar variable:', error);
        }
      });
    }
  }

  deleteVariable(id: number, nombre: string) {
    const confirmacion = confirm(`¿Estás seguro de que deseas eliminar la variable "${nombre}"?`);

    if (confirmacion) {
      this.variableSevice.deleteVariable(id).subscribe({
        next: (response) => {
          console.log('Variable eliminada:', response);
          this.loadVariables();
        },
        error: (error) => {
          console.error('Error al eliminar variable:', error);
        }
      });
    }
  }
}
