import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RawMaterialService {
  private baseURL =
    'https://aerial-chimera-367203.rj.r.appspot.com/api/RawMaterials';

  constructor(private http: HttpClient) {}

  getRawMaterials(): Observable<any> {
    return this.http.get(`${this.baseURL}`);
  }

  createRawMaterial(rawMaterial: Object): Observable<Object> {
    return this.http.post(`${this.baseURL}`, rawMaterial);
  }

  getRawMaterialById(id: number): Observable<any> {
    return this.http.get(`${this.baseURL}/${id}`);
  }

  updateRawMaterial(id: number, rawMaterial: Object): Observable<Object> {
    return this.http.put(`${this.baseURL}/${id}`, rawMaterial);
  }

  deleteRawMaterial(id: number): Observable<any> {
    return this.http.delete(`${this.baseURL}/${id}`);
  }
}
