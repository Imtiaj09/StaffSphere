import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { SystemUser } from './models/system-user.model';
import { parseJson } from './utils/storage.util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'employee-management-system';
  isToggled = false;
  isHrPayrollOpen = false;
  isUserMenuOpen = false;
  currentUser: SystemUser | null = null;
  showSidebar = true;

  constructor(public router: Router) {
    this.showSidebar = this.shouldShowHeaderAndSidebar(this.router.url);
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.loadCurrentUser();
      this.isUserMenuOpen = false;
      if (event.urlAfterRedirects.includes('/hr-payroll')) {
        this.isHrPayrollOpen = true;
      } else {
        this.isHrPayrollOpen = false;
      }
      this.showSidebar = this.shouldShowHeaderAndSidebar(event.urlAfterRedirects);
    });
  }

  ngOnInit(): void {
    this.loadCurrentUser();
  }

  shouldShowHeaderAndSidebar(url: string): boolean {
    return !url.includes('/login');
  }

  loadCurrentUser(): void {
    const user = localStorage.getItem('currentUser');
    this.currentUser = parseJson<SystemUser | null>(user, null);
  }

  toggleSidebar(): void {
    this.isToggled = !this.isToggled;
  }

  toggleHrPayroll(): void {
    this.isHrPayrollOpen = !this.isHrPayrollOpen;
  }

  toggleUserMenu(): void {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  logout(): void {
    if (confirm('Are you sure you want to log out?')) {
      localStorage.removeItem('currentUser');
      this.currentUser = null;
      this.isUserMenuOpen = false;
      this.router.navigate(['/login']);
    }
  }
}
