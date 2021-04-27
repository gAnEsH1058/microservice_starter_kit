import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';



import { MatDialogModule } from '@angular/material';


import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { AppRoutingModule } from './app.routing.module';
import {UserService} from './user/user.service';
import {HttpClientModule} from "@angular/common/http";
import {AddUserComponent} from './user/add-user.component';

import { contactusComponent } from './contactus/contactus.component';
import { aboutComponent } from './about/about.component';
import { helpComponent} from './help/help.component';
import {ViewDetailsComponent} from './view-details/view-details.component'

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    AddUserComponent,

    contactusComponent,
    aboutComponent,
    helpComponent,

  
    ViewDetailsComponent
   
  ],
  entryComponents:[
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
FormsModule,
MatDialogModule,
    BrowserAnimationsModule
    
  ],
  
  exports:[MatDialogModule],
  providers:[UserService],
 
  bootstrap: [AppComponent]
  

})
export class AppModule { }
