import { Component, Input } from '@angular/core';
import { CurrencyService } from "../../../services/currency.service";
import { CurrencyValue } from "../../../models/currency-value.model";
import { Router } from '@angular/router';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent {
  amount: number = 0;
  fromCurrency: string = 'EUR';
  toCurrency: string = 'USD';
  exchangeRate: number = 1.20;
  convertedAmount: number = 0;
  currencyValues: CurrencyValue[] = this.currencyService.getCurrencyValues();
  @Input() detail: boolean = false;

  constructor(
    public currencyService: CurrencyService,
    private router: Router
  ) {
  }

  convert(): void {
    this.convertedAmount = this.amount * this.exchangeRate;
  }

  showDetails(): void {
    this.router.navigate(['/detail', this.fromCurrency, this.toCurrency]);
  }

  backToHome(): void {
    this.router.navigate(['/']);
  }
}
