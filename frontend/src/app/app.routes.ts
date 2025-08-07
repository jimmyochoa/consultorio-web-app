import { Routes } from '@angular/router';
import { HomeComponent } from './pages/main/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { AppointmentsComponent } from './pages/dashboard/appointments/appointments.component';
import { PatientsComponent } from './pages/dashboard/patients/patients.component';
import { AboutComponent } from './pages/main/about/about.component';
import { AuthComponent } from './layouts/auth/auth.component';
import { GuestGuard } from './guards/guest.guard';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { MainComponent } from './layouts/main/main.component';
import { LogoutComponent } from './pages/auth/logout/logout.component';

export const routes: Routes = [
  // Public routes inside Main layout
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'about', component: AboutComponent }
    ]
  },

  // Auth routes inside Auth layout
  {
    path: 'auth',
    component: AuthComponent,
    //canActivate: [GuestGuard],
    children: [
      { path: 'login', component: LoginComponent},
      { path: 'register', component: RegisterComponent },
      { path: 'logout', component: LogoutComponent },
      { path: '**', redirectTo: 'login' },
    ]
  },

  // Dashboard routes inside Dashboard layout
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'appointments', component: AppointmentsComponent },
      { path: 'patients', component: PatientsComponent },
      { path: '**', redirectTo: 'appointments' }
    ]
  },

  { path: '**', redirectTo: '', pathMatch: 'full' }
];