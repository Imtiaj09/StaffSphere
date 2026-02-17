import { Component, OnInit } from '@angular/core';
import { parseJson } from '../../utils/storage.util';

interface Client {
  code: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  status: 'Active' | 'Inactive';
}

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  isModalVisible = false;
  isEditMode = false;
  clients: Client[] = [];
  clientForm: Client = {
    code: '',
    name: '',
    address: '',
    phone: '',
    email: '',
    status: 'Active'
  };

  ngOnInit(): void {
    this.loadClientsFromStorage();
  }

  openModal(client?: Client): void {
    if (client) {
      this.isEditMode = true;
      // Use JSON stringify/parse for a deep copy to ensure compatibility
      this.clientForm = JSON.parse(JSON.stringify(client));
    } else {
      this.isEditMode = false;
      this.resetClientForm();
    }
    this.isModalVisible = true;
  }

  closeModal(): void {
    this.isModalVisible = false;
    this.resetClientForm();
  }

  saveClient(): void {
    // Validation
    if (!this.clientForm.code || !this.clientForm.name || !this.clientForm.address || !this.clientForm.phone || !this.clientForm.email) {
      alert('Please fill out all client fields.');
      return;
    }

    if (this.isEditMode) {
      // Update existing client
      const index = this.clients.findIndex(c => c.code === this.clientForm.code);
      if (index !== -1) {
        this.clients[index] = { ...this.clientForm };
        alert('Client Updated Successfully!');
      }
    } else {
      // Add new client
      this.clients.unshift({ ...this.clientForm });
      alert('New Client Registered Successfully!');
    }

    this.saveClientsToStorage();
    this.closeModal();
  }

  deleteClient(clientCode: string): void {
    // Confirmation
    if (confirm('Are you sure you want to delete this client?')) {
      // Find and remove the client
      this.clients = this.clients.filter(c => c.code !== clientCode);
      this.saveClientsToStorage();
    }
  }

  private loadClientsFromStorage(): void {
    const storedClients = localStorage.getItem('clientsData');
    if (storedClients) {
      this.clients = parseJson<Client[]>(storedClients, []);
    } else {
      this.clients = [
        { code: 'CL23523', name: 'Macro COde', address: 'WERWRWE', phone: '0711111111', email: 'macrocode@gmail.com', status: 'Active' }
      ];
    }
  }

  private saveClientsToStorage(): void {
    localStorage.setItem('clientsData', JSON.stringify(this.clients));
  }

  private resetClientForm(): void {
    this.clientForm = {
      code: '',
      name: '',
      address: '',
      phone: '',
      email: '',
      status: 'Active'
    };
  }
}
