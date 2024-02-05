import { Component, Input, OnInit } from '@angular/core';
import { CurrencyService } from "../../../services/currency.service";
import { CurrencyValue } from "../../../models/currency-value.model";
import { Router } from '@angular/router';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit {
  amount: number = 1;
  newAmount: number = 1;
  currencyValues: CurrencyValue[] = this.currencyService.getCurrencyValues();
  @Input() fromCurrency: string = 'EUR';
  @Input() toCurrency: string = 'USD';
  @Input() detail: boolean = false;

  constructor(
    public currencyService: CurrencyService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.getCurrencyRates('EUR');
  }

  getCurrencyRates(baseCurrency: string): void {
    /* this.currencyService.getCurrencyRates(baseCurrency).subscribe(
      (rates: { [currency: string]: number }) => {
        this.amount = this.newAmount;
        this.currencyValues.forEach(currency => {
          const rate = rates[currency.currency];
          currency.value = (rate * this.amount) || 0;
        });
      },
      error => {
        console.error('Error fetching currency rates:', error);
      }
    ); */
  }

  getCurrencyRate(toCurrency: string): number {
    const currency = this.currencyValues.find(c => c.currency === toCurrency);
    return currency ? currency.value : 0;
  }

  convert(): void {
    this.getCurrencyRates(this.fromCurrency);
  }

  showDetails(): void {
    this.router.navigate(['/detail', this.fromCurrency, this.toCurrency]);
  }

  backToHome(): void {
    this.router.navigate(['/']);
  }

  swapCurrency(): void {
    const tempCurrency: string = this.fromCurrency;
    this.fromCurrency = this.toCurrency;
    this.toCurrency = tempCurrency;
  }
}
