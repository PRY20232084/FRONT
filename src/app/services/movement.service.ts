import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovementService {
  private baseURL =
    'https://aerial-chimera-367203.rj.r.appspot.com/api/Movements';

  constructor(private http: HttpClient) {}

  getMovements(): Observable<any> {
    return this.http.get(`${this.baseURL}`);
  }

  getIncomeMovements(): Observable<any> {
    return this.http.get(`${this.baseURL}/GetIncomeMovements`);
  }

  getWithdrawalMovements(): Observable<any> {
    return this.http.get(`${this.baseURL}/GetWithdrawalMovements`);
  }

  getMovement(id: number): Observable<any> {
    return this.http.get(`${this.baseURL}/${id}`);
  }

  createMovement(movement: Object): Observable<Object> {
    return this.http.post(`${this.baseURL}`, movement);
  }

  updateMovement(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseURL}/${id}`, value);
  }

  deleteMovement(id: number): Observable<any> {
    return this.http.delete(`${this.baseURL}/${id}`);
  }
}
