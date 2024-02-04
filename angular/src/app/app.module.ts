import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/pages/home/home.component';
import { DetailComponent } from './components/pages/detail/detail.component';
import { HeaderComponent } from './components/sections/header/header.component';
import { ConverterComponent } from './components/sections/converter/converter.component';
import { CardsComponent } from './components/sections/cards/cards.component';
import { CurrencyComponent } from './components/sections/cards/currency/currency.component';
import { ChartComponent } from './components/sections/chart/chart.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DetailComponent,
    HeaderComponent,
    ConverterComponent,
    CardsComponent,
    CurrencyComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
