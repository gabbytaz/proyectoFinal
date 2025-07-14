// src/app/services/user.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from '../../enviroments/enviroments';


@Injectable({
  providedIn: 'root'
})

export class UserService {
  private readonly apiUrl = environment.api;
  private readonly http = inject(HttpClient);
  private readonly jsonHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  private users: User[] = [];
  private currentId = 1;

  loadUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}`);
  }

  addUser(user: Omit<User, 'id'>): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/add`, user, {
      headers: this.jsonHeaders
    });
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/update/${user.id}`, user, {
      headers: this.jsonHeaders
    });
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  /*deleteUser(user: User): Observable<User> {
   return this.http.delete<User>(`${this.apiUrl}/delete/${user.id}`, {
     headers: this.jsonHeaders 
   });
 }*/

  getUserById(id: number): User | undefined {
    return this.users.find(u => u.id === id);
  }
}
