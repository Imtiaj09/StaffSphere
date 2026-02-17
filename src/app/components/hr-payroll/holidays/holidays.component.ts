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
    // 1. Validation updated
    if (!this.holidayForm.name || !this.holidayForm.startDate) {
      alert('Holiday Name and Start Date are required.');
      return;
    }

    // If end date is empty, set it to the start date
    if (!this.holidayForm.endDate) {
      this.holidayForm.endDate = this.holidayForm.startDate;
    }

    if (this.isEditMode) {
      const index = this.allHolidays.findIndex(h => h.id === this.holidayForm.id);
      if (index !== -1) {
        this.allHolidays[index] = { ...this.holidayForm };
        alert('Holiday Updated Successfully!');
      }
    } else {
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
      // 2. Sorting on load
      this.allHolidays.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
    } else {
      this.allHolidays = [];
    }
  }

  saveHolidaysToStorage(): void {
    localStorage.setItem('holidaysData', JSON.stringify(this.allHolidays));
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
