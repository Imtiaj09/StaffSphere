import { Component, OnInit } from '@angular/core';

interface Holiday {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  description: string;
}

@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.css']
})
export class HolidaysComponent implements OnInit {

  allHolidays: Holiday[] = [];
  isModalVisible = false;
  isEditMode = false;
  holidayForm: Holiday = this.getInitialFormState();

  constructor() { }

  ngOnInit(): void {
    this.loadHolidaysFromStorage();
  }

  // --- Modal Control ---
  openModal(holiday?: Holiday): void {
    if (holiday) {
      this.isEditMode = true;
      this.holidayForm = { ...holiday };
    } else {
      this.isEditMode = false;
      this.holidayForm = this.getInitialFormState();
    }
    this.isModalVisible = true;
  }

  closeModal(): void {
    this.isModalVisible = false;
  }

  // --- Data Handling (CRUD) ---
  saveHoliday(): void {
    if (!this.holidayForm.name || !this.holidayForm.startDate || !this.holidayForm.endDate) {
      alert('Holiday Name, Start Date, and End Date are required.');
      return;
    }

    if (this.isEditMode) {
      const index = this.allHolidays.findIndex(h => h.id === this.holidayForm.id);
      if (index !== -1) {
        this.allHolidays[index] = { ...this.holidayForm };
        alert('Holiday Updated Successfully!');
      }
    } else {
      // Find the highest existing ID
      const highestId = this.allHolidays.reduce((maxId, h) => h.id > maxId ? h.id : maxId, 0);
      this.holidayForm.id = highestId + 1;
      this.allHolidays.push({ ...this.holidayForm });
      alert('Holiday Added Successfully!');
    }

    this.saveHolidaysToStorage();
    this.closeModal();
  }

  deleteHoliday(holidayId: number): void {
    if (confirm('Are you sure you want to delete this holiday?')) {
      this.allHolidays = this.allHolidays.filter(h => h.id !== holidayId);
      this.saveHolidaysToStorage();
    }
  }

  // --- Storage and Utility ---
  loadHolidaysFromStorage(): void {
    const storedHolidays = localStorage.getItem('holidaysData');
    if (storedHolidays) {
      this.allHolidays = JSON.parse(storedHolidays);
    } else {
      this.allHolidays = [];
    }
  }

  saveHolidaysToStorage(): void {
    localStorage.setItem('holidaysData', JSON.stringify(this.allHolidays));
    // Sort by date after saving
    this.allHolidays.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
  }

  getInitialFormState(): Holiday {
    return { id: 0, name: '', startDate: '', endDate: '', description: '' };
  }

  getDayOfWeek(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  }
}
