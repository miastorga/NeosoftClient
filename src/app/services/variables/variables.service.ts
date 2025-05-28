import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export type Variables = {
  id: number,
  nombre: string,
  valor: string,
  tipo: string
}

@Injectable({
  providedIn: 'root'
})
export class VariablesService {
  private apiUrl = 'http://localhost:5191/api/Variable'
  http = inject(HttpClient)

  constructor() { }

  getVariables(): Observable<Variables[]> {
    return this.http.get<Variables[]>(this.apiUrl);
  }

  getVariable(id: number): Observable<Variables> {
    return this.http.get<Variables>(`${this.apiUrl}/${id}`);
  }

  createVariable(variable: Omit<Variables, 'id'>): Observable<Variables> {
    return this.http.post<Variables>(this.apiUrl, variable);
  }

  updateVariable(id: number, variable: Partial<Variables>): Observable<Variables> {
    return this.http.put<Variables>(`${this.apiUrl}/${id}`, variable);
  }

  deleteVariable(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
