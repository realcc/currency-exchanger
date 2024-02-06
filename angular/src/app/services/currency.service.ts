import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CurrencyValue } from '../models/currency-value.model';
import { ChartValue } from '../models/chart-value.model';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private apiUrl = 'http://data.fixer.io/api/';
  private supportedSymbolsCacheKey = 'supportedSymbols';
  public supportedSymbols: { [key: string]: string } = {};
  private currencyRatesCacheKey = 'currencyRatesCache_';
  private historicalRatesCacheKey = 'historicalRatesCache_';
  public chartData: ChartValue[] = [];
  private currencyValues:CurrencyValue[] = [
    { value: 0, currency: 'USD' },
    { value: 0, currency: 'EUR' },
    { value: 0, currency: 'GBP' },
    { value: 0, currency: 'JPY' },
    { value: 0, currency: 'AUD' },
    { value: 0, currency: 'CAD' },
    { value: 0, currency: 'CHF' },
    { value: 0, currency: 'HKD' },
    { value: 0, currency: 'NZD' },
  ];

  constructor(private http: HttpClient) { }

  getCurrencyValues(): CurrencyValue[] {
    return this.currencyValues;
  }

  getCurrencyName(currencyCode: string): string {
    const currency = this.supportedSymbols[currencyCode];
    return currency ? currency : '';
  }

  getCurrencyRates(baseCurrency: string): Observable<any> {
    const cacheDuration = 24 * 60 * 60 * 1000; // One day in milliseconds
    const cacheKey = `${this.currencyRatesCacheKey}${baseCurrency}`;
    const cachedData = this.getFromLocalStorage(cacheKey, cacheDuration);
    const toCurrencies = this.currencyValues.map(currency => currency.currency);

    if (cachedData) {
      return new Observable(observer => {
        observer.next(cachedData);
        observer.complete();
      });
    }

    const url = `${this.apiUrl}/latest?access_key=${environment.fixerApiKey}&base=${baseCurrency}&symbols=${toCurrencies.join(',')}`;
    return this.http.get(url);
  }

  fetchCurrencyRates(baseCurrency: string, amount: number): void {
    this.getCurrencyRates(baseCurrency).subscribe((response: any) => {
      if (response.success && response.rates) {
        this.saveToLocalStorage(
          `${this.currencyRatesCacheKey}${baseCurrency}`,
          response
        );
        this.processRates(response.rates, amount);
      } else {
        console.error('Failed to fetch currency rates:', response.error);
      }
    });
  }

  private processRates(rates: { [currency: string]: number }, amount: number): void {
    this.currencyValues.forEach(currency => {
      const rate = rates[currency.currency];
      currency.value = (rate * amount) || 0;
    });
  }

  getHistoricalRates(from: string, to: string): Observable<any> {
    const currentDate = new Date();
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const cacheKey = `${this.historicalRatesCacheKey}${from}_${to}_${endOfMonth.toISOString().slice(0, 10)}`;
    const cacheDataString = localStorage.getItem(cacheKey);
    if (cacheDataString) {
      const cachedData = JSON.parse(cacheDataString);
      if (cachedData) {
        return new Observable(observer => {
          observer.next(cachedData.data);
          observer.complete();
        });
      }
    }

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

  fetchHistoricalRates(fromCurrency: string, toCurrency: string): void {
    const currentDate = new Date();
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const cacheKey = `${this.historicalRatesCacheKey}${fromCurrency}_${toCurrency}_${endOfMonth.toISOString().slice(0, 10)}`;
    this.getHistoricalRates(fromCurrency, toCurrency)
      .subscribe(
        (responses) => {
          this.chartData = this.processHistoricalRates(responses, toCurrency);
          if (this.chartData.length > 0) {
            this.saveToLocalStorage(cacheKey, responses);
          }
        },
        (error) => {
          console.error('Error fetching historical rates:', error);
        }
      );
  }

  processHistoricalRates(responses: any[], toCurrency: string): any {
    const monthlyRates: ChartValue[] = [];

    responses.forEach((response: any, index: number) => {
      if (response.success && response.historical) {
        const rates = response.rates;
        const date = response.date;

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

  private saveToLocalStorage(cacheKey: string, data: any): void {
    const cacheData = {
      timestamp: new Date().getTime(),
      data,
    };
    localStorage.setItem(cacheKey, JSON.stringify(cacheData));
  }

  private getFromLocalStorage(cacheKey: string, cacheDuration: number): any {
    const cacheDataString = localStorage.getItem(cacheKey);
    if (cacheDataString) {
      const cacheData = JSON.parse(cacheDataString);
      const currentTime = new Date().getTime();
      if (currentTime - cacheData.timestamp < cacheDuration) {
        return cacheData.data;
      }
    }
    return null;
  }

  getSupportedSymbols(): Observable<any> {
    const cacheDuration = 7 * 24 * 60 * 60 * 1000; // One week in milliseconds
    const cachedData = this.getFromLocalStorage(this.supportedSymbolsCacheKey, cacheDuration);
    if (cachedData) {
      this.supportedSymbols = cachedData;
      return new Observable();
    }

    const url = `${this.apiUrl}/symbols?access_key=${environment.fixerApiKey}`;
    return this.http.get(url);
  }

  fetchSupportedSymbols(): void {
    this.getSupportedSymbols().subscribe((response: any) => {
      if (response.success && response.symbols) {
        this.supportedSymbols = response.symbols;
        this.saveToLocalStorage(this.supportedSymbolsCacheKey, this.supportedSymbols);
      } else {
        console.error('Failed to fetch supported symbols:', response.error);
      }
    });
  }
}
