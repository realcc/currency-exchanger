import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ChartComponent } from './chart.component'
import { CurrencyService } from '../../../services/currency.service'
import { HttpClientModule } from '@angular/common/http'

describe('ChartComponent', () => {
  let fixture: ComponentFixture<ChartComponent>
  let component: ChartComponent
  let currencyService: CurrencyService

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChartComponent],
      imports: [HttpClientModule],
      providers: [CurrencyService], // Add the service to the providers
    })

    fixture = TestBed.createComponent(ChartComponent)
    component = fixture.componentInstance
    currencyService = TestBed.inject(CurrencyService) // Inject the service

    spyOn(currencyService, 'fetchHistoricalRates') // Mock the service method
  })

  it('should create the app', () => {
    expect(component).toBeTruthy()
  })

  it('should have a canvas with class "chart"', () => {
    fixture.detectChanges()
    const compiled = fixture.nativeElement
    const chartCanvas = compiled.querySelector('.chart')
    expect(chartCanvas).toBeTruthy()
  })

  it('should call fetchHistoricalRates on ngOnInit', () => {
    spyOn(component, 'fetchHistoricalRates')
    component.ngOnInit()
    expect(component.fetchHistoricalRates).toHaveBeenCalled()
  })

  // Add more tests as needed for other methods and functionalities
})
