import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductSizeService {
  private baseURL =
    'https://aerial-chimera-367203.rj.r.appspot.com/api/ProductSizes';
  constructor(private http: HttpClient) {}

  getProductSizes(): Observable<any> {
    return this.http.get(`${this.baseURL}`);
  }

  getProductSizeById(id: number): Observable<any> {
    return this.http.get(`${this.baseURL}/${id}`);
  }

  createProductSize(productSize: Object): Observable<Object> {
    return this.http.post(`${this.baseURL}`, productSize);
  }

  updateProductSize(id: number, productSize: Object): Observable<Object> {
    return this.http.put(`${this.baseURL}/${id}`, productSize);
  }

  deleteProductSize(id: number): Observable<any> {
    return this.http.delete(`${this.baseURL}/${id}`);
  }
}
