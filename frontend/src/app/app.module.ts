import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {ContactListComponent} from './contact-list/contact-list.component';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ContactDetailComponent} from './contact-detail/contact-detail.component';
import {AppComponent} from './app.component';
import {routes} from './app.routes';
import {HomeComponent} from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactDetailComponent,


  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    RouterModule,
    RouterModule.forRoot(routes),
    ContactListComponent,
    HomeComponent

  ],
})
export class AppModule {}
