import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MeasurementUnitService {
  private baseURL =
    'https://aerial-chimera-367203.rj.r.appspot.com/api/MeasurementUnits';
  constructor(private http: HttpClient) {}

  getMeasurementUnits(): Observable<any> {
    return this.http.get(`${this.baseURL}`);
  }

  getMeasurementUnitById(id: number): Observable<any> {
    return this.http.get(`${this.baseURL}/${id}`);
  }

  createMeasurementUnit(measurementUnit: Object): Observable<Object> {
    return this.http.post(`${this.baseURL}`, measurementUnit);
  }

  updateMeasurementUnit(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseURL}/${id}`, value);
  }

  deleteMeasurementUnit(id: number): Observable<any> {
    return this.http.delete(`${this.baseURL}/${id}`);
  }
}
