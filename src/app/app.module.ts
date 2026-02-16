import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import FormsModule

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
    SystemSettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule // Add FormsModule here
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
