import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'employee-management-system';
  isToggled = false;
  isHrPayrollOpen = false;

  toggleSidebar() {
    this.isToggled = !this.isToggled;
  }

  toggleHrPayroll() {
    this.isHrPayrollOpen = !this.isHrPayrollOpen;
  }
}
