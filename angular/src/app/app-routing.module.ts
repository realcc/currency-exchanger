import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { DetailComponent } from './components/pages/detail/detail.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot([
    { path: '', component: HomeComponent },
    { path: 'detail/:from/:to', component: DetailComponent }
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
