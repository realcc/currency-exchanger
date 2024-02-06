import { Component, Input } from '@angular/core'
import { CurrencyService } from '../../../services/currency.service'
import { CurrencyValue } from '../../../models/currency-value.model'

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent {
  @Input() currencyValues: CurrencyValue[] = this.currencyService.getCurrencyValues()

  constructor(private currencyService: CurrencyService) {}
}
