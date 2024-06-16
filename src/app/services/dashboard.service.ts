import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private baseURL =
    'https://predictionservicedeployed-hlcdpytahq-rj.a.run.app';
  constructor(private http: HttpClient) {}

  predict(predictRequest: Object): Observable<any> {
    return this.http.post(`${this.baseURL}/predict`, predictRequest)
  }

  lastMonths(predictRequest: Object): Observable<any> {
    return this.http.post(`${this.baseURL}/last_six_months`, predictRequest)
  }
}
