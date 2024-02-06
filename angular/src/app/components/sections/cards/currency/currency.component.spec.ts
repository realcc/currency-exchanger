import { ComponentFixture, TestBed } from '@angular/core/testing'
import { CurrencyComponent } from './currency.component'

describe('CurrencyComponent', () => {
  let fixture: ComponentFixture<CurrencyComponent>
  let component: CurrencyComponent

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CurrencyComponent],
    })

    fixture = TestBed.createComponent(CurrencyComponent)
    component = fixture.componentInstance
  })

  it('should create the app', () => {
    expect(component).toBeTruthy()
  })

  it('should have a div with class "box"', () => {
    fixture.detectChanges()
    const compiled = fixture.nativeElement
    const boxDiv = compiled.querySelector('.box')
    expect(boxDiv).toBeTruthy()
  })

  it('should display the amount and currency', () => {
    component.amount = 1.23
    component.currency = 'USD'
    fixture.detectChanges()

    const compiled = fixture.nativeElement
    const boxContent = compiled.querySelector('.box').textContent

    expect(boxContent).toContain('1.23 USD')
  })
})
