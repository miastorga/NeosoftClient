import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export type Roles = {
  id: number,
  nombre: string
}

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private apiUrl = 'http://localhost:5191/api/Role'
  http = inject(HttpClient)

  constructor() { }

  getRoles(): Observable<Roles[]> {
    return this.http.get<Roles[]>(this.apiUrl);
  }

  getRole(id: number): Observable<Roles> {
    return this.http.get<Roles>(`${this.apiUrl}/${id}`);
  }

  createRole(role: Omit<Roles, 'id'>): Observable<Roles> {
    return this.http.post<Roles>(this.apiUrl, role);
  }

  updateRole(id: number, role: Partial<Roles>): Observable<Roles> {
    return this.http.put<Roles>(`${this.apiUrl}/${id}`, role);
  }

  deleteRole(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
