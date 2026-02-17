import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ClientsComponent } from './components/clients/clients.component';
import { FixedAssetsComponent } from './components/fixed-assets/fixed-assets.component';
import { LeaveApplicationsComponent } from './components/leave-applications/leave-applications.component';
import { SecurityComponent } from './components/security/security.component';
import { AdministrationComponent } from './components/administration/administration.component';
import { SystemSettingsComponent } from './components/system-settings/system-settings.component';
import { EmployeesComponent } from './components/hr-payroll/employees/employees.component';
import { HolidaysComponent } from './components/hr-payroll/holidays/holidays.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard'; // Import the guard

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  // Protected application routes
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'clients', component: ClientsComponent, canActivate: [AuthGuard] },
  { path: 'fixed-assets', component: FixedAssetsComponent, canActivate: [AuthGuard] },
  { path: 'hr-payroll/employees', component: EmployeesComponent, canActivate: [AuthGuard] },
  { path: 'hr-payroll/holidays', component: HolidaysComponent, canActivate: [AuthGuard] },
  { path: 'leave-applications', component: LeaveApplicationsComponent, canActivate: [AuthGuard] },
  { path: 'security', component: SecurityComponent, canActivate: [AuthGuard] },
  { path: 'administration', component: AdministrationComponent, canActivate: [AuthGuard] },
  { path: 'system-settings', component: SystemSettingsComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
