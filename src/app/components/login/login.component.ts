import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Re-using the SystemUser interface definition for clarity
interface SystemUser {
  id: number;
  fullName: string;
  email: string;
  password?: string;
  role: 'Admin' | 'Sub-Admin' | 'HR' | 'Employee';
  status: 'Active' | 'Inactive';
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData = {
    email: '',
    password: ''
  };

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Auto-login check
    if (localStorage.getItem('currentUser')) {
      this.router.navigate(['/dashboard']);
    }
  }

  onLogin(): void {
    // 1. Validation
    if (!this.loginData.email || !this.loginData.password) {
      alert('Email and Password are required.');
      return;
    }

    // 2. Authentication Process
    const storedUsers = localStorage.getItem('systemUsers');
    if (!storedUsers) {
      alert('No system users found. Please contact the administrator.');
      return;
    }

    const allUsers: SystemUser[] = JSON.parse(storedUsers);

    const foundUser = allUsers.find(user => user.email === this.loginData.email && user.password === this.loginData.password);

    if (foundUser) {
      // 3. Success
      alert('Login Successful!');
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
      this.router.navigate(['/dashboard']);
    } else {
      // 4. Failure
      alert('Invalid Email or Password');
    }
  }
}
