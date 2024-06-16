import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductStyleService {
  private baseURL =
    'https://aerial-chimera-367203.rj.r.appspot.com/api/ProductStyles';

  constructor(private http: HttpClient) {}

  getProductStyles(): Observable<any> {
    return this.http.get(`${this.baseURL}`);
  }

  getProductStyleById(id: number): Observable<any> {
    return this.http.get(`${this.baseURL}/${id}`);
  }

  createProductStyle(productStyle: Object): Observable<Object> {
    return this.http.post(`${this.baseURL}`, productStyle);
  }

  updateProductStyle(id: number, productStyle: Object): Observable<Object> {
    return this.http.put(`${this.baseURL}/${id}`, productStyle);
  }

  deleteProductStyle(id: number): Observable<any> {
    return this.http.delete(`${this.baseURL}/${id}`);
  }
}
