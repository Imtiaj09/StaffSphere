import { Component, OnInit } from '@angular/core';
import { SystemUser } from '../../models/system-user.model';
import { parseJson } from '../../utils/storage.util';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent implements OnInit {

  allUsers: SystemUser[] = [];
  isModalVisible = false;
  isEditMode = false;
  isPasswordVisible = false;
  userForm: SystemUser = this.getInitialFormState();
  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;
  selectedFileName = '';

  constructor() { }

  ngOnInit(): void {
    this.isModalVisible = false; // Explicitly hide modal on init
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
    this.selectedFile = null;
    this.previewUrl = null;
    this.selectedFileName = '';
    this.isPasswordVisible = false;
  }

  closeModal(): void {
    this.isModalVisible = false;
  }

  // --- Data Handling (CRUD) ---
  saveUser(): void {
    if (!this.userForm.fullName || !this.userForm.email || !this.userForm.password || !this.userForm.role) {
      alert('Full Name, Email, Password, and Role are required.');
      return;
    }
    this.finalizeUserSave();
  }

  finalizeUserSave(): void {
    // Only update the photoUrl if a new file was selected
    if (this.previewUrl) {
      this.userForm.photoUrl = this.previewUrl as string;
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

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.selectedFileName = file.name;

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.userForm.photoUrl = e.target.result;
        this.previewUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  // --- Storage and Utility ---
  loadUsersFromStorage(): void {
    const storedUsers = localStorage.getItem('systemUsers');
    if (storedUsers) {
      this.allUsers = parseJson<SystemUser[]>(storedUsers, []);
      if (this.allUsers.length === 0) {
        this.initializeDefaultAdmin();
      }
    } else {
      this.initializeDefaultAdmin();
    }
  }

  saveUsersToStorage(): void {
    localStorage.setItem('systemUsers', JSON.stringify(this.allUsers));
  }

  getInitialFormState(): SystemUser {
    return { id: 0, fullName: '', email: '', password: '', role: 'User', photoUrl: '' };
  }

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  private initializeDefaultAdmin(): void {
    const defaultAdmin: SystemUser = {
      id: 1,
      fullName: 'Super Admin',
      email: 'admin@company.com',
      password: 'admin123',
      role: 'Admin',
      status: 'Active',
      photoUrl: 'https://i.pravatar.cc/40'
    };
    this.allUsers = [defaultAdmin];
    this.saveUsersToStorage();
  }
}
