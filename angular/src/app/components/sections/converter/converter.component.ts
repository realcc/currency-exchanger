import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core'
import { CurrencyService } from '../../../services/currency.service'
import { CurrencyValue } from '../../../models/currency-value.model'
import { Router } from '@angular/router'

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss'],
})
export class ConverterComponent implements OnInit {
  amount: number = 1
  newAmount: number = 1
  currencyValues: CurrencyValue[] = this.currencyService.getCurrencyValues()
  supportedSymbols: { [key: string]: string } = {}
  @Input() fromCurrency: string = 'EUR'
  @Input() toCurrency: string = 'USD'
  @Input() detail: boolean = false
  @Output() newAmountChange = new EventEmitter<number>()

  constructor(
    public currencyService: CurrencyService,
    public router: Router,
  ) {}

  ngOnInit() {
    this.currencyService.fetchSupportedSymbols()
    this.supportedSymbols = this.currencyService.supportedSymbols
    this.getCurrencyRates('EUR')
  }

  getCurrencyRates(baseCurrency: string): void {
    this.currencyService.fetchCurrencyRates(baseCurrency, this.newAmount)
    this.amount = this.newAmount
  }

  getCurrencyRate(toCurrency: string): number {
    const currency = this.currencyValues.find((c) => c.currency === toCurrency)
    return currency ? currency.value : 0
  }

  convert(): void {
    this.getCurrencyRates(this.fromCurrency)
  }

  showDetails(): void {
    this.router.navigate(['/detail', this.fromCurrency, this.toCurrency])
  }

  backToHome(): void {
    this.router.navigate(['/'])
  }

  swapCurrency(): void {
    if (this.newAmount) {
      const tempCurrency: string = this.fromCurrency
      this.fromCurrency = this.toCurrency
      this.toCurrency = tempCurrency
    }
  }

  updateNewAmount() {
    this.newAmountChange.emit(this.newAmount)
  }
}
