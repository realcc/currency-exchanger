import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  newAmount: number = 1
  fromCurrency: string = ''
  toCurrency: string = ''

  constructor(private route: ActivatedRoute) {}

  handleNewAmountChange(updatedAmount: number): void {
    this.newAmount = updatedAmount
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.fromCurrency = params['from']
      this.toCurrency = params['to']
    })
  }
}
