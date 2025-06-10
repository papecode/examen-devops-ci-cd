import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from '../services/contact.service';

@Pipe({
  name: 'filterByName',
  standalone: true
})
export class FilterByNamePipe implements PipeTransform {
  transform(contacts: Contact[], searchTerm: string): Contact[] {
    if (!searchTerm) return contacts;
    return contacts.filter(c =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
}
