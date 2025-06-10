import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {Router, RouterModule} from '@angular/router';
import { ContactService, Contact } from '../services/contact.service';


@Component({
  selector: 'app-contact-list',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent {
  searchTerm: string = '';
  contacts: Contact[] = [];
  selectedIds: number[] = [];
  sortBy: 'name' | 'position' = 'name';

  constructor(private contactService: ContactService,private router: Router) {
    this.contacts = this.contactService.getContacts().map(contact => ({
      ...contact,
      addedAt: new Date()
    }));
  }

  toggleSelect(id: number): void {
    if (this.selectedIds.includes(id)) {
      this.selectedIds = this.selectedIds.filter(i => i !== id);
    } else {
      this.selectedIds.push(id);
    }


    this.router.navigate(['/details', id]);
  }

  isSelected(id: number): boolean {
    return this.selectedIds.includes(id);
  }

  deleteSelected(): void {
    this.contacts = this.contacts.filter(contact => !this.selectedIds.includes(contact.id));
    this.selectedIds = [];
  }

  get sortedContacts(): Contact[] {
    const filtered = this.contacts.filter(c =>
      c.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    return filtered.sort((a, b) => a[this.sortBy].localeCompare(b[this.sortBy]));
  }

  setSortBy(type: 'name' | 'position'): void {
    this.sortBy = type;
  }
}
