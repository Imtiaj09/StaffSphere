import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'employee-management-system';
  isToggled = false;
  isHrPayrollOpen = false;

  constructor(private router: Router) {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      if (event.urlAfterRedirects.includes('/hr-payroll')) {
        this.isHrPayrollOpen = true;
      }
    });
  }

  toggleSidebar() {
    this.isToggled = !this.isToggled;
  }

  toggleHrPayroll() {
    this.isHrPayrollOpen = !this.isHrPayrollOpen;
  }
}
