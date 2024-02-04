import { Component, Input } from '@angular/core';
import { CurrencyService } from '../../../services/currency.service';
import { CurrencyValue } from '../../../models/currency-value.model';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent {
  @Input() currencyValues:CurrencyValue[] = this.currencyService.getCurrencyValues();

  constructor(private currencyService:CurrencyService) {
  }
}
