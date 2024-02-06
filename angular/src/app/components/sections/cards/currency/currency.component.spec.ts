import { TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { CurrencyComponent } from './currency.component'

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [CurrencyComponent],
    }).compileComponents()
  })

  it('should create the app', () => {
    const fixture = TestBed.createComponent(CurrencyComponent)
    const app = fixture.componentInstance
    expect(app).toBeTruthy()
  })

  it(`should have as title 'angular'`, () => {
    const fixture = TestBed.createComponent(CurrencyComponent)
    const app = fixture.componentInstance
    expect(app.title).toEqual('angular')
  })

  it('should render title', () => {
    const fixture = TestBed.createComponent(CurrencyComponent)
    fixture.detectChanges()
    const compiled = fixture.nativeElement as HTMLElement
    expect(compiled.querySelector('.content span')?.textContent).toContain('angular app is running!')
  })
})
