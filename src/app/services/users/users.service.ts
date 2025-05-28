import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export type User = {
  id: number,
  nombre: string,
  email: string,
  rolId: number
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'http://localhost:5191/api/User'
  http = inject(HttpClient)

  constructor() { }

  getUsuarios(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUsuario(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  createUsuario(usuario: Omit<User, 'id'>): Observable<User> {
    console.log(usuario)
    return this.http.post<User>(this.apiUrl, usuario);
  }

  updateUsuario(id: number, usuario: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, usuario);
  }

  deleteUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
