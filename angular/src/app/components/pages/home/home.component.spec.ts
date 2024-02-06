import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { HeaderComponent } from '../../sections/header/header.component'
import { ConverterComponent } from '../../sections/converter/converter.component'
import { CardsComponent } from '../../sections/cards/cards.component'
import { HttpClientModule } from '@angular/common/http'

describe('HomeComponent', () => {
  let fixture: ComponentFixture<HomeComponent>;
  let component: HomeComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        HeaderComponent,
        ConverterComponent,
        CardsComponent
      ],
      imports: [HttpClientModule],
    });

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have a div with class "home"', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const homeDiv = compiled.querySelector('.home');
    expect(homeDiv).toBeTruthy();
  });

  it('should have three child components: app-header, app-converter, app-cards', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const headerComponent = compiled.querySelector('app-header');
    const converterComponent = compiled.querySelector('app-converter');
    const cardsComponent = compiled.querySelector('app-cards');

    expect(headerComponent).toBeTruthy();
    expect(converterComponent).toBeTruthy();
    expect(cardsComponent).toBeTruthy();
  });
});
