import { Component, AfterViewInit, OnInit, ElementRef, OnDestroy, Renderer2, ViewChild } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { CurrencyService } from '../../../services/currency.service';
import { ChartValue } from '../../../models/chart-value.model';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements AfterViewInit, OnInit {
  @ViewChild('chartCanvas', { static: false }) chartCanvas!: ElementRef<HTMLCanvasElement>;
  private resizeSubscription!: Subscription;
  chartData: ChartValue[] = [];

  constructor(
    private renderer: Renderer2,
    private currencyService: CurrencyService
  ) {}

  ngOnInit(): void {
    this.fetchHistoricalRates('EUR', 'USD');
  }

  fetchHistoricalRates(fromCurrency: string, toCurrency: string): void {
    this.currencyService.fetchHistoricalRates(fromCurrency, toCurrency);
    this.chartData = this.currencyService.chartData;
  }

  ngAfterViewInit(): void {
    this.setCanvasSize();
    this.setupResizeListener();
    this.drawChart();
  }

  ngOnDestroy(): void {
    if (this.resizeSubscription) {
      this.resizeSubscription.unsubscribe();
    }
  }

  private setCanvasSize(): void {
    const canvas = this.chartCanvas.nativeElement;
    const container = canvas.parentElement;
    if (container) {
      canvas.width = container.clientWidth;
      canvas.height = 320;
      this.drawChart();
    }
  }

  private setupResizeListener(): void {
    this.resizeSubscription = fromEvent(window, 'resize')
      .pipe(debounceTime(200))
      .subscribe(() => {
        this.setCanvasSize();
      });
  }

  private drawChart(): void {
    const canvas = this.chartCanvas.nativeElement;
    if (canvas.parentElement) {
      const containerWidth = canvas.parentElement.clientWidth;
      canvas.width = containerWidth;
    }
    const context = canvas.getContext('2d');

    if ((context) && (this.chartData.length > 0)) {
      const width = canvas.width;
      const height = canvas.height;
      const marginLeft = 50;
      const marginRight = 30;
      const marginTop = 20;
      const marginBottom = 20;
      const effectiveWidth = width - marginLeft - marginRight;
      const effectiveHeight = height - marginTop - marginBottom;
      const xScale = effectiveWidth / (this.chartData.length - 1);
      const yScale = effectiveHeight / Math.max(...this.chartData.map(dataPoint => dataPoint.rate));

      context.clearRect(0, 0, width, height);
      context.strokeStyle = 'blue';
      context.lineWidth = 2;

      // Draw the chart line with all margins
      context.beginPath();
      this.chartData.forEach((dataPoint, index) => {
        const x = marginLeft + index * (effectiveWidth / (this.chartData.length - 1)); // Apply left and right margins
        const y = marginTop + effectiveHeight - dataPoint.rate * yScale;
        context.lineTo(x, y);
        context.arc(x, y, 3, 0, 2 * Math.PI); // Optional: Add circles at data points
      });
      context.stroke();

      // Add month labels on the x-axis with top and bottom margins
      context.fillStyle = 'white';
      context.font = '10px Arial';
      context.textAlign = 'center';
      this.chartData.forEach((dataPoint, index) => {
        const x = marginLeft + index * (effectiveWidth / (this.chartData.length - 1));
        const y = marginTop + effectiveHeight + 15;
        context.fillText(dataPoint.month, x, y);
      });

      // Add vertical axis labels with top and bottom margins
      context.textAlign = 'right';
      context.fillText('0', marginLeft - 5, marginTop + effectiveHeight);
      context.fillText(String(Math.max(...this.chartData.map(dataPoint => dataPoint.rate))), marginLeft - 5, marginTop + 10);
    }
  }
}
