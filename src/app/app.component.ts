import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

interface SystemUser {
  id: number;
  fullName: string;
  email: string;
  password?: string;
  role: 'Admin' | 'Sub-Admin' | 'HR' | 'Employee';
  status: 'Active' | 'Inactive';
  photoUrl?: string;
}

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
  showSidebar: boolean = true; // 1. Property added

  constructor(public router: Router) {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      if (event.urlAfterRedirects.includes('/hr-payroll')) {
        this.isHrPayrollOpen = true;
      }
      // 2. Logic updated to assign to the property
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
    if (user) {
      this.currentUser = JSON.parse(user);
    }
  }

  toggleSidebar() {
    this.isToggled = !this.isToggled;
  }

  toggleHrPayroll() {
    this.isHrPayrollOpen = !this.isHrPayrollOpen;
  }

  toggleUserMenu() {
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
