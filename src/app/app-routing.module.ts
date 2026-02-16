import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ClientsComponent } from './components/clients/clients.component';
import { FixedAssetsComponent } from './components/fixed-assets/fixed-assets.component';
// HrPayrollComponent is no longer needed for a direct route
// import { HrPayrollComponent } from './components/hr-payroll/hr-payroll.component';
import { LeaveApplicationsComponent } from './components/leave-applications/leave-applications.component';
import { SecurityComponent } from './components/security/security.component';
import { AdministrationComponent } from './components/administration/administration.component';
import { SystemSettingsComponent } from './components/system-settings/system-settings.component';
import { EmployeesComponent } from './components/hr-payroll/employees/employees.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'clients', component: ClientsComponent },
  { path: 'fixed-assets', component: FixedAssetsComponent },
  // New top-level route for employees to ensure it uses the main layout
  { path: 'hr-payroll/employees', component: EmployeesComponent },
  { path: 'leave-applications', component: LeaveApplicationsComponent },
  { path: 'security', component: SecurityComponent },
  { path: 'administration', component: AdministrationComponent },
  { path: 'system-settings', component: SystemSettingsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
