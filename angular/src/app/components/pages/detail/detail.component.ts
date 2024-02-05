import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  fromCurrency: string = '';
  toCurrency: string = '';

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.fromCurrency = params['from'];
      this.toCurrency = params['to'];

      // Now you have access to fromCurrency and toCurrency
      console.log('From Currency:', this.fromCurrency);
      console.log('To Currency:', this.toCurrency);
    });
  }
}
