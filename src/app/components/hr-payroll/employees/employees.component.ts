import { Component, OnInit } from '@angular/core';

// The detailed model for the form and for storage
interface EmployeeData {
  [key: string]: any;
  employeeNo: string;
  firstName: string;
  middleName: string;
  lastName: string;
  phone: string;
  email: string;
  gender: string;
  country: string;
  dob: string;
  employmentDate: string;
  address: string;
  department: string;
  designation: string;
  bankName: string;
  bankAccountNo: string;
  iban: string;
  swift: string;
  nssf: string;
  nhif: string;
  companyEmail: string;
  kraPin: string;
  passportNo: string;
  employmentTerms: string;
  disabilityType: string;
  disabilityCert: string;
  photoUrl: string;
  status: 'Active' | 'Inactive';
  leaveBalance: number;
}

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  allEmployees: EmployeeData[] = [];
  filteredEmployees: EmployeeData[] = [];
  paginatedEmployees: EmployeeData[] = [];

  // --- View States ---
  isDetailViewVisible = false;
  isModalVisible = false;
  isEditMode = false;
  activeDropdownId: number | null = null; // Use row index to track the open dropdown
  dropdownStyle = {}; // For dynamic positioning

  // --- Data Models ---
  employeeForm: EmployeeData = this.getInitialFormState();
  selectedEmployee: EmployeeData | null = null;

  // Pagination and Search
  currentPage = 1;
  itemsPerPage = 10;
  searchTerm = '';

  // Sorting
  sortColumn = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor() { }

  ngOnInit(): void {
    this.loadEmployeesFromStorage();
    this.applyFiltersAndPagination();
  }

  // --- Modal & View Control ---
  openModal(employee?: EmployeeData): void {
    if (employee) {
      this.isEditMode = true;
      this.employeeForm = JSON.parse(JSON.stringify(employee));
    } else {
      this.isEditMode = false;
      this.employeeForm = this.getInitialFormState();
    }
    this.isModalVisible = true;
    this.activeDropdownId = null; // Close dropdown when opening modal
  }

  closeModal(): void {
    this.isModalVisible = false;
  }

  viewEmployee(employeeNo: string): void {
    const employee = this.allEmployees.find(e => e.employeeNo === employeeNo);
    if (employee) {
      this.selectedEmployee = employee;
      this.isDetailViewVisible = true;
      this.activeDropdownId = null;
    }
  }

  hideDetailView(): void {
    this.isDetailViewVisible = false;
    this.selectedEmployee = null;
  }

  // --- Data Handling (CRUD) ---
  saveEmployee(): void {
    // Strict validation
    if (!this.employeeForm.firstName || !this.employeeForm.lastName) {
      alert('First Name and Last Name are required.');
      return;
    }
    if (!this.employeeForm.phone) {
      alert('Phone Number is required.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.employeeForm.email)) {
      alert('Invalid Email Address.');
      return;
    }
    if (this.employeeForm.country.includes('Select') || this.employeeForm.department.includes('Select') || this.employeeForm.designation.includes('Select')) {
      alert('Please make a valid selection for Country, Department, and Designation.');
      return;
    }

    if (this.isEditMode) {
      const index = this.allEmployees.findIndex(e => e.employeeNo === this.employeeForm.employeeNo);
      if (index !== -1) {
        this.allEmployees[index] = { ...this.employeeForm };
        alert('Employee Updated Successfully!');
      }
    } else {
      // Find the highest existing ID to prevent duplicates after deletion
      const highestId = this.allEmployees.reduce((maxId, e) => {
        const currentId = parseInt(e.employeeNo.replace('Emp', ''), 10);
        return currentId > maxId ? currentId : maxId;
      }, 0);
      this.employeeForm.employeeNo = `Emp${String(highestId + 1).padStart(3, '0')}`;
      this.allEmployees.unshift({ ...this.employeeForm });
      alert('Employee Registered Successfully!');
    }

    this.saveEmployeesToStorage();
    this.applyFiltersAndPagination();
    this.closeModal();
  }

  deleteEmployee(employeeNo: string): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.allEmployees = this.allEmployees.filter(e => e.employeeNo !== employeeNo);
      this.saveEmployeesToStorage();
      this.applyFiltersAndPagination();

      // Fix for empty pagination bug
      if (this.paginatedEmployees.length === 0 && this.currentPage > 1) {
        this.currentPage--;
        this.applyFiltersAndPagination();
      }
      this.activeDropdownId = null;
    }
  }

  // --- Storage and Utility ---
  loadEmployeesFromStorage(): void {
    const storedEmployees = localStorage.getItem('employeesData');
    if (storedEmployees) {
      this.allEmployees = JSON.parse(storedEmployees);
    } else {
      const dummyEmployee = this.getInitialFormState();
      dummyEmployee.employeeNo = 'Emp001';
      dummyEmployee.firstName = 'James';
      dummyEmployee.lastName = 'Karanja';
      dummyEmployee.status = 'Active';
      this.allEmployees = [dummyEmployee];
      this.saveEmployeesToStorage();
    }
  }

  saveEmployeesToStorage(): void {
    localStorage.setItem('employeesData', JSON.stringify(this.allEmployees));
  }

  getInitialFormState(): EmployeeData {
    return {
      employeeNo: '', firstName: '', middleName: '', lastName: '', phone: '', email: '', gender: 'Select Gender',
      country: 'Select Country', dob: '', employmentDate: '', address: '', department: 'Select Department',
      designation: 'Select Designation', bankName: 'Select Bank', bankAccountNo: '', iban: '', swift: '',
      nssf: '', nhif: '', companyEmail: '', kraPin: '', passportNo: '', employmentTerms: 'Select Employment Terms',
      disabilityType: 'Select Disability Type', disabilityCert: '', photoUrl: '', status: 'Active', leaveBalance: 0
    };
  }

  applyFiltersAndPagination(): void {
    const searchTermLower = this.searchTerm.toLowerCase();
    // Filter first
    this.filteredEmployees = this.allEmployees.filter(e =>
      (e.firstName + ' ' + e.middleName + ' ' + e.lastName).toLowerCase().includes(searchTermLower) ||
      e.employeeNo.toLowerCase().includes(searchTermLower) ||
      e.email.toLowerCase().includes(searchTermLower) ||
      e.phone.toLowerCase().includes(searchTermLower)
    );

    // Then sort
    this.sortData();

    // Reset dropdown state before pagination
    this.activeDropdownId = null;

    // Then paginate
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedEmployees = this.filteredEmployees.slice(startIndex, startIndex + this.itemsPerPage);
  }

  sort(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.applyFiltersAndPagination();
  }

  private sortData(): void {
    if (!this.sortColumn) return;

    this.filteredEmployees.sort((a, b) => {
      const valA = String(a[this.sortColumn]).toLowerCase();
      const valB = String(b[this.sortColumn]).toLowerCase();

      if (valA < valB) {
        return this.sortDirection === 'asc' ? -1 : 1;
      }
      if (valA > valB) {
        return this.sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }

  toggleActionsDropdown(index: number, event: MouseEvent): void {
    if (this.activeDropdownId === index) {
      this.activeDropdownId = null; // Close if already open
    } else {
      const target = event.currentTarget as HTMLElement; // Use currentTarget for reliability
      const rect = target.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;

      if (spaceBelow < 150) { // Not enough space below, open upwards
        this.dropdownStyle = { bottom: '100%', top: 'auto' };
      } else { // Default, open downwards
        this.dropdownStyle = { top: '100%', bottom: 'auto' };
      }
      this.activeDropdownId = index; // Open for the clicked row index
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      // 3. File size check
      if (file.size > 500000) { // 500KB limit
        alert('File too large');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        this.employeeForm.photoUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  // Add trackBy function for ngFor
  trackByEmployeeNo(index: number, employee: EmployeeData): string {
    return employee.employeeNo;
  }

  onSearch(): void { this.currentPage = 1; this.applyFiltersAndPagination(); }
  onItemsPerPageChange(): void { this.currentPage = 1; this.applyFiltersAndPagination(); }
  prevPage(): void { if (this.currentPage > 1) { this.currentPage--; this.applyFiltersAndPagination(); } }
  nextPage(): void { if (this.currentPage * this.itemsPerPage < this.filteredEmployees.length) { this.currentPage++; this.applyFiltersAndPagination(); } }
}
