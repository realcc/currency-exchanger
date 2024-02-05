import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CurrencyValue } from '../models/currency-value.model';
import { ChartValue } from '../models/chart-value.model';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private apiUrl = 'http://data.fixer.io/api/';
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

  getCurrencyRates(fromCurrency: string): Observable<{ [currency: string]: number }> {
    const toCurrencies = this.currencyValues.map(currency => currency.currency);
    const url = `${this.apiUrl}latest?access_key=${environment.fixerApiKey}&base=${fromCurrency}&symbols=${toCurrencies.join(',')}`;

    return this.http.get(url).pipe(
      map((response: any) => {
        if (response.success) {
          return response.rates as { [currency: string]: number };
        } else {
          throw new Error('Failed to fetch currency rates.');
        }
      })
    );
  }

  getHistoricalRates(from: string, to: string): Observable<any> {
    const currentDate = new Date();
    const endDate = this.formatDate(currentDate);

    // Call the API 12 times to get rates for the last day of each previous month
    const requests = Array.from({ length: 12 }, (_, index) => {
      const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - index, 0);
      return this.http.get(`${this.apiUrl}/${this.formatDate(startDate)}?access_key=${environment.fixerApiKey}&base=${from}&symbols=${to}`);
    });

    return forkJoin(requests);
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Function to process and filter the response
  processHistoricalRates(responses: any[], toCurrency: string): any {
    const monthlyRates: ChartValue[] = [];

    responses.forEach((response: any, index: number) => {
      if (response.success && response.historical) {
        const rates = response.rates;
        const date = response.date;

        // Store only the last day's rate for each month
        const parts = date.split('-');
        const yearMonth = `${parts[0]}-${parts[1]}`;

        monthlyRates.push({
          month: `${new Date(date).toLocaleString('en-us', { month: 'short' })} ${new Date(date).getFullYear()}`,
          rate: rates[toCurrency]
        });
      }
    });

    return monthlyRates.reverse();
  }
}
