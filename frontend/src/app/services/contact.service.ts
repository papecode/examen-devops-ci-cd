import { Injectable } from '@angular/core';

export interface Contact {
  id: number;
  name: string;
  position: string;
  email: string;
  phone: string;
  imageUrl: string;
  company: string;
  address: string;
  addedAt: Date; // ✅ Ajouté ici
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private contacts: Contact[] = [
    {
      id: 1,
      name: 'Alice Dupont',
      position: 'Directrice Marketing',
      email: 'alice.dupont@example.com',
      phone: '+33 1 23 45 67 89',
      imageUrl: 'https://randomuser.me/api/portraits/women/65.jpg',
      company: 'Acme Corp',
      address: '10 rue de Paris, 75001 Paris',
      addedAt: new Date('2024-04-01')
    },
    {
      id: 2,
      name: 'Jean Martin',
      position: 'Développeur Frontend',
      email: 'jean.martin@example.com',
      phone: '+33 6 12 34 56 78',
      imageUrl: 'https://randomuser.me/api/portraits/men/44.jpg',
      company: 'Tech Solutions',
      address: '42 avenue des Champs, 75008 Paris',
      addedAt: new Date('2024-04-02')
    },
    {
      id: 3,
      name: 'Sophie Bernard',
      position: 'Chef de Projet',
      email: 'sophie.bernard@example.com',
      phone: '+33 7 89 01 23 45',
      imageUrl: 'https://randomuser.me/api/portraits/women/43.jpg',
      company: 'Innovatech',
      address: '5 boulevard Saint-Michel, 75005 Paris',
      addedAt: new Date('2024-04-03')
    },
    {
      id: 4,
      name: 'Lucas Moreau',
      position: 'Data Analyst',
      email: 'lucas.moreau@example.com',
      phone: '+33 6 98 76 54 32',
      imageUrl: 'https://randomuser.me/api/portraits/men/66.jpg',
      company: 'DataCorp',
      address: '12 rue Lafayette, 75009 Paris',
      addedAt: new Date('2024-04-04')
    },
    {
      id: 5,
      name: 'Emma Lefevre',
      position: 'UX Designer',
      email: 'emma.lefevre@example.com',
      phone: '+33 7 11 22 33 44',
      imageUrl: 'https://randomuser.me/api/portraits/women/50.jpg',
      company: 'DesignPro',
      address: '22 rue Oberkampf, 75011 Paris',
      addedAt: new Date('2024-04-05')
    },
    {
      id: 6,
      name: 'Thomas Garnier',
      position: 'Ingénieur DevOps',
      email: 'thomas.garnier@example.com',
      phone: '+33 6 22 33 44 55',
      imageUrl: 'https://randomuser.me/api/portraits/men/75.jpg',
      company: 'CloudTech',
      address: '45 boulevard Haussmann, 75008 Paris',
      addedAt: new Date('2024-04-06')
    },
    {
      id: 7,
      name: 'Camille Dubois',
      position: 'Responsable RH',
      email: 'camille.dubois@example.com',
      phone: '+33 6 55 66 77 88',
      imageUrl: 'https://randomuser.me/api/portraits/women/60.jpg',
      company: 'PeopleFirst',
      address: '78 rue de Rivoli, 75001 Paris',
      addedAt: new Date('2024-04-07')
    },
    {
      id: 8,
      name: 'Nina Laurent',
      position: 'Chargée de communication',
      email: 'nina.laurent@example.com',
      phone: '+33 7 45 67 89 01',
      imageUrl: 'https://randomuser.me/api/portraits/women/22.jpg',
      company: 'MediaPlus',
      address: '15 avenue de la République, 75011 Paris',
      addedAt: new Date('2024-04-08')
    }
  ];

  getContacts(): Contact[] {
    return this.contacts;
  }

  getContactById(id: number): Contact | undefined {
    return this.contacts.find(c => c.id === id);
  }
}
