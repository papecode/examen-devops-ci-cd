import { Routes } from '@angular/router';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import {HomeComponent} from './components/home/home.component';




export const routes: Routes = [
  { path: 'details/:id', component: ContactDetailComponent },
  { path: 'contact', component: ContactListComponent },
  { path: '', component: HomeComponent },


];
