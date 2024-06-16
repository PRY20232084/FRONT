import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';
import { RegisterUser } from '../models/CreateUser';
import { Login } from '../models/Login';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  baseURL = 'http://localhost:27719/api/users';

  getUsers(): Observable<any>{
    return this.http.get(`${this.baseURL}`);
  }

  getUser(id: number): Observable<any>{
    return this.http.get(`${this.baseURL}/${id}`);
  }

  createUser(user: RegisterUser): Observable<Object>{
    return this.http.post(`${this.baseURL}/register`, user);
  }

  updateUser(id: number, value: any): Observable<Object>{
    return this.http.put(`${this.baseURL}/${id}`, value);
  }

  deleteUser(id: number): Observable<any>{
    return this.http.delete(`${this.baseURL}/${id}`);
  }

  login(user: Login): Observable<any>{
    return this.http.post(`${this.baseURL}/login`, user);
  }
}
