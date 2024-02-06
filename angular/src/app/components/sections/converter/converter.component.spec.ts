import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ConverterComponent } from './converter.component'
import { CurrencyService } from '../../../services/currency.service'
import { RouterTestingModule } from '@angular/router/testing'
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'

describe('ConverterComponent', () => {
  let fixture: ComponentFixture<ConverterComponent>
  let component: ConverterComponent
  let currencyService: CurrencyService

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConverterComponent],
      imports: [RouterTestingModule, FormsModule, HttpClientModule], // Add required modules
      providers: [CurrencyService], // Add the service to the providers
    })

    fixture = TestBed.createComponent(ConverterComponent)
    component = fixture.componentInstance
    currencyService = TestBed.inject(CurrencyService) // Inject the service

    spyOn(currencyService, 'fetchSupportedSymbols')
    spyOn(currencyService, 'fetchCurrencyRates')

    fixture.detectChanges()
  })

  it('should create the app', () => {
    expect(component).toBeTruthy()
  })

  it('should call fetchSupportedSymbols and fetchCurrencyRates on ngOnInit', () => {
    expect(currencyService.fetchSupportedSymbols).toHaveBeenCalled()
    expect(currencyService.fetchCurrencyRates).toHaveBeenCalled()
  })

  it('should set supportedSymbols after calling fetchSupportedSymbols', () => {
    component.ngOnInit()
    expect(component.supportedSymbols).toEqual({})
  })

  it('should call getCurrencyRates with correct parameters on convert', () => {
    spyOn(component, 'getCurrencyRates')
    component.convert()
    expect(component.getCurrencyRates).toHaveBeenCalledWith(component.fromCurrency)
  })

  it('should navigate to "/detail" on showDetails', () => {
    spyOn(component.router, 'navigate')
    component.showDetails()
    expect(component.router.navigate).toHaveBeenCalledWith(['/detail', component.fromCurrency, component.toCurrency])
  })

  it('should swap currencies on swapCurrency', () => {
    const initialFromCurrency = component.fromCurrency
    const initialToCurrency = component.toCurrency

    component.swapCurrency()

    expect(component.fromCurrency).toEqual(initialToCurrency)
    expect(component.toCurrency).toEqual(initialFromCurrency)
  })

  // Add more tests as needed for other methods and functionalities
})
