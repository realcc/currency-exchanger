import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { DetailComponent } from './detail.component';
import { HeaderComponent } from '../../sections/header/header.component'
import { ConverterComponent } from '../../sections/converter/converter.component'
import { ChartComponent } from '../../sections/chart/chart.component'
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http'

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        DetailComponent,
        HeaderComponent,
        ConverterComponent,
        ChartComponent
      ],
      imports: [HttpClientModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of(convertToParamMap({ from: 'EUR', to: 'USD' })),
            snapshot: {
              paramMap: convertToParamMap({ from: 'EUR', to: 'USD' })
            }
          }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Add more tests as needed
});
