import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ContactService, Contact } from '../services/contact.service';

@Component({
  selector: 'app-contact-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss']
})
export class ContactDetailComponent {
  contact: Contact | undefined;

  constructor(private route: ActivatedRoute, private contactService: ContactService) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.contact = this.contactService.getContactById(id);
  }
}
