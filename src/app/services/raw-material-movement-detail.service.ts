import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RawMaterialMovementDetailService {
  private baseURL =
    'https://aerial-chimera-367203.rj.r.appspot.com/api/RawMaterialMovementDetails';

  constructor(private http: HttpClient) {}

  createRawMaterialMovementDetail(
    RawMaterialMovementDetail: Object
  ): Observable<Object> {
    return this.http.post(`${this.baseURL}`, RawMaterialMovementDetail);
  }
}
