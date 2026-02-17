import { Component, OnInit } from '@angular/core';

// 1. Data Model Updated
interface SystemUser {
  id: number;
  fullName: string;
  email: string; // Used as username
  password?: string; // Optional for display
  role: 'Admin' | 'Sub-Admin' | 'HR' | 'Employee';
  status: 'Active' | 'Inactive';
  photoUrl?: string;
}

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent implements OnInit {

  allUsers: SystemUser[] = [];
  isModalVisible = false;
  isEditMode = false;
  userForm: SystemUser = this.getInitialFormState();

  constructor() { }

  ngOnInit(): void {
    this.loadUsersFromStorage();
  }

  // --- Modal Control ---
  openModal(user?: SystemUser): void {
    if (user) {
      this.isEditMode = true;
      this.userForm = { ...user };
    } else {
      this.isEditMode = false;
      this.userForm = this.getInitialFormState();
    }
    this.isModalVisible = true;
  }

  closeModal(): void {
    this.isModalVisible = false;
  }

  // --- Data Handling (CRUD) ---
  saveUser(): void {
    if (!this.userForm.fullName || !this.userForm.email || !this.userForm.password || !this.userForm.role) {
      alert('All fields are required.');
      return;
    }

    if (this.isEditMode) {
      const index = this.allUsers.findIndex(u => u.id === this.userForm.id);
      if (index !== -1) {
        this.allUsers[index] = { ...this.userForm };
        alert('User Updated Successfully!');
      }
    } else {
      const highestId = this.allUsers.reduce((maxId, u) => u.id > maxId ? u.id : maxId, 0);
      this.userForm.id = highestId + 1;
      this.allUsers.push({ ...this.userForm });
      alert('User Added Successfully!');
    }

    this.saveUsersToStorage();
    this.closeModal();
  }

  deleteUser(userId: number): void {
    if (confirm('Are you sure you want to delete this system user?')) {
      this.allUsers = this.allUsers.filter(u => u.id !== userId);
      this.saveUsersToStorage();
    }
  }

  // --- Storage and Utility ---
  loadUsersFromStorage(): void {
    const storedUsers = localStorage.getItem('systemUsers');
    if (storedUsers) {
      this.allUsers = JSON.parse(storedUsers);
    } else {
      // If storage is empty, create a default Super Admin
      const defaultAdmin: SystemUser = {
        id: 1,
        fullName: 'Super Admin',
        email: 'admin@company.com',
        password: 'admin123',
        role: 'Admin',
        status: 'Active',
        photoUrl: 'https://i.pravatar.cc/40' // Default placeholder
      };
      this.allUsers = [defaultAdmin];
      this.saveUsersToStorage();
    }
  }

  saveUsersToStorage(): void {
    localStorage.setItem('systemUsers', JSON.stringify(this.allUsers));
  }

  getInitialFormState(): SystemUser {
    return { id: 0, fullName: '', email: '', password: '', role: 'Employee', status: 'Active', photoUrl: '' };
  }
}
