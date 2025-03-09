import { Routes } from '@angular/router';
import { HomeComponent } from './components/footer/home/home.component';
import { ApplyComponent } from './components/footer/apply/apply.component';

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'apply', component: ApplyComponent},
  {path: "**", redirectTo: 'home', pathMatch: 'full'}
];
