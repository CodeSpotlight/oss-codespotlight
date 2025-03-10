import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ApplyComponent } from './components/apply/apply.component';
import { RequirementsComponent } from './components/requirements/requirements.component';
import { ParticipantsComponent } from './components/participants/participants.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';


export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'apply', component: ApplyComponent},
  {path: 'requirements', component: RequirementsComponent},
  {path: 'participants', component: ParticipantsComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'user/:username', component: UserProfileComponent},
  {path: "**", redirectTo: 'home', pathMatch: 'full'}
];
