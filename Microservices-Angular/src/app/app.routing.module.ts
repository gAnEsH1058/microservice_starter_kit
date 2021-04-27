
import { NgModule, Component } from '@angular/core';



import { RouterModule, Routes } from '@angular/router';

import { UserComponent } from './user/user.component';
import {AddUserComponent} from './user/add-user.component';

import {contactusComponent} from './contactus/contactus.component';
import {aboutComponent} from './about/about.component';
import { helpComponent} from './help/help.component';

import {ViewDetailsComponent} from './view-details/view-details.component';
const routes: Routes = [
  { path: 'help' , component: helpComponent },
  { path: 'about', component: aboutComponent },
  { path: 'contactus', component: contactusComponent },
  { path: '', component: UserComponent },
  { path: 'add', component: AddUserComponent },
 
  { path: 'view/:id', component: ViewDetailsComponent },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
