import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { HeaderComponent } from './header.component'
import { Router } from '@angular/router'

describe('HeaderComponent', () => {
  let fixture: ComponentFixture<HeaderComponent>
  let component: HeaderComponent
  let router: Router

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [RouterTestingModule],
    })

    fixture = TestBed.createComponent(HeaderComponent)
    component = fixture.componentInstance
    router = TestBed.inject(Router)

    spyOn(router, 'navigate')
  })

  it('should create the app', () => {
    expect(component).toBeTruthy()
  })

  it('should navigate to details with EUR-USD on button click', () => {
    const button = fixture.nativeElement.querySelector('button')
    button.click()

    expect(router.navigate).toHaveBeenCalledWith(['/detail', 'EUR', 'USD'])
  })

  it('should navigate to details with EUR-GBP on second button click', () => {
    const buttons = fixture.nativeElement.querySelectorAll('button')
    buttons[1].click()

    expect(router.navigate).toHaveBeenCalledWith(['/detail', 'EUR', 'GBP'])
  })
})
