import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'employee-management-system';
  isToggled = false; // Sidebar is visible by default on desktop

  toggleSidebar() {
    this.isToggled = !this.isToggled;
  }
}
