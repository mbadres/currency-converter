import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConverterService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getLatestRates(base: string = 'USD', currencies: string[] = []): Observable<any> {
    const params = { base, currencies: currencies.join(',') };
    return this.http.get(`${this.apiUrl}/currency/latest`, { params });
  }

  convertCurrency(from: string, to: string, amount: number): Observable<any> {
    const params = { from, to, amount: amount.toString() };
    return this.http.get(`${this.apiUrl}/currency/convert`, { params });
  }
}