import { Component } from '@angular/core'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  newAmount: number = 1

  handleNewAmountChange(updatedAmount: number): void {
    this.newAmount = updatedAmount
  }
}
