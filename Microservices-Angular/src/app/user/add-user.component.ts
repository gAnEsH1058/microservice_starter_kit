import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../models/user.model';
import { UserService } from './user.service';

@Component({
  templateUrl: './add-user.component.html'
})
export class AddUserComponent {

  user: User = new User();

  constructor(private router: Router, private userService: UserService) {

  }


 

  ngOnInit() {
    this.user=this.userService.getter();
  };
  /*createUser(): void {
>>>>>>> d69d272f4d8dbdbdb1d7961700d9a9348c00ea10
    this.userService.createUser(this.user)
        .subscribe( data => {
          alert("User created successfully.");
        });

<<<<<<< HEAD
  };

=======
  };*/
  processForm(){
    if(this.user.id==undefined){
       this.userService.createUser(this.user).subscribe((user)=>{
        alert("User created successfully.");
         this.router.navigate(['/']);
       }
       );
    }else{
       this.userService.updateUser(this.user).subscribe((user)=>{
        alert("User upated successfully.");
         this.router.navigate(['/']);
       });
    }
  }

  }

