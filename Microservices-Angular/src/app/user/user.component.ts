import { Component, OnInit,ViewChild } from '@angular/core';

import { Router } from '@angular/router';

import { User } from '../models/user.model';
import { UserService } from './user.service';


import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig,MatDialogClose,MatButton} from '@angular/material';

//import { userInfo } from 'os';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: ['./user.component.css']
})
export class UserComponent implements OnInit {


  users: User[];


  constructor(private router: Router, private userService: UserService,private dialog: MatDialog) {


  }

  ngOnInit() {
    this.userService.getUsers()
      .subscribe( data => {
        this.users = data;
      });
  };

  deleteUser(user: User): void {
    this.userService.deleteUser(user)
      .subscribe( data => {
        this.users = this.users.filter(u => u !== user);
      })
  };





  
  updateUser(user:User){
    this.userService.setter(user);
    this.router.navigate(['/add']);

  }
 
  createUser(){
    let user=new User();
    this.userService.setter(user);
    this.router.navigate(['/add']);

  }

}

