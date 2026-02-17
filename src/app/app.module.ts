import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ClientsComponent } from './components/clients/clients.component';
import { FixedAssetsComponent } from './components/fixed-assets/fixed-assets.component';
import { HrPayrollComponent } from './components/hr-payroll/hr-payroll.component';
import { LeaveApplicationsComponent } from './components/leave-applications/leave-applications.component';
import { SecurityComponent } from './components/security/security.component';
import { AdministrationComponent } from './components/administration/administration.component';
import { SystemSettingsComponent } from './components/system-settings/system-settings.component';
import { EmployeesComponent } from './components/hr-payroll/employees/employees.component';
import { HolidaysComponent } from './components/hr-payroll/holidays/holidays.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ClickOutsideDirective } from './click-outside.directive';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ClientsComponent,
    FixedAssetsComponent,
    HrPayrollComponent,
    LeaveApplicationsComponent,
    SecurityComponent,
    AdministrationComponent,
    SystemSettingsComponent,
    EmployeesComponent,
    HolidaysComponent,
    LoginComponent,
    ProfileComponent,
    ClickOutsideDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
