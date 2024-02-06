import { ComponentFixture, TestBed } from '@angular/core/testing'
import { CardsComponent } from './cards.component'
import { CurrencyComponent } from './currency/currency.component'
import { CurrencyService } from '../../../services/currency.service'

describe('CardsComponent', () => {
  let fixture: ComponentFixture<CardsComponent>
  let component: CardsComponent
  let mockCurrencyService: jasmine.SpyObj<CurrencyService>

  beforeEach(() => {
    mockCurrencyService = jasmine.createSpyObj('CurrencyService', ['getCurrencyValues'])
    mockCurrencyService.getCurrencyValues.and.returnValue([
      { value: 1.23, currency: 'USD' },
      { value: 0.88, currency: 'EUR' },
      // Add more sample data as needed
    ])

    TestBed.configureTestingModule({
      declarations: [CardsComponent, CurrencyComponent],
      providers: [{ provide: CurrencyService, useValue: mockCurrencyService }],
    })

    fixture = TestBed.createComponent(CardsComponent)
    component = fixture.componentInstance
  })

  it('should create the app', () => {
    expect(component).toBeTruthy()
  })

  it('should have a div with class "cards"', () => {
    fixture.detectChanges()
    const compiled = fixture.nativeElement
    const cardsDiv = compiled.querySelector('.cards')
    expect(cardsDiv).toBeTruthy()
  })

  it('should display a set of app-currency components', () => {
    fixture.detectChanges()
    const compiled = fixture.nativeElement
    const currencyComponents = compiled.querySelectorAll('app-currency')
    expect(currencyComponents.length).toBe(2) // Adjust based on the number of sample data provided
  })
})
