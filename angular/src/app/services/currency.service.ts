import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CurrencyValue } from '../models/currency-value.model';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private apiUrl = '';
  private currencyValues:CurrencyValue[] = [
    { value: 0, currency: 'USD', name: 'United States Dollar' },
    { value: 0, currency: 'EUR', name: 'European Union Euro' },
    { value: 0, currency: 'GBP', name: 'Great Britain Poundsterling' },
    { value: 0, currency: 'JPY', name: 'Japanese Yen' },
    { value: 0, currency: 'AUD', name: 'Australian Dollar' },
    { value: 0, currency: 'CAD', name: 'Canadian Dollar' },
    { value: 0, currency: 'CHF', name: 'Swiss Franc' },
    { value: 0, currency: 'HKD', name: 'Hong Kong Dollar' },
    { value: 0, currency: 'NZD', name: 'New Zealand Dollar' },
  ];

  constructor(private http: HttpClient) { }

  getCurrencyValues(): CurrencyValue[] {
    return this.currencyValues;
  }

  getCurrencyName(currencyCode: string): string {
    const currency = this.currencyValues.find(c => c.currency === currencyCode);
    return currency ? currency.name : '';
  }

  getCurrencyRates(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getHistoricalRates(from: string, to: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/historical?from=${from}&to=${to}`);
  }
}
