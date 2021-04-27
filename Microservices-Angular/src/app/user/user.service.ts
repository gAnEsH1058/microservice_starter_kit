import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../models/user.model';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {

  constructor(private http:HttpClient) {}


  //private userUrl = 'http://localhost:8080/user-portal/api';

  private user:User;
  
  private userUrl ="/api/";

  //private userUrl = '/api';

  public getUsers() {
    return this.http.get<User[]>(this.userUrl);
  }

  public deleteUser(user) {
    return this.http.delete(this.userUrl + "/"+ user.id);
  }

  public getUser(id:number) {
    return this.http.get<User>(this.userUrl+ "/"+ id);
    }
  


  public createUser(user:User) {
    return this.http.post<User>(this.userUrl, user);
  }
  public updateUser(user:User) {
    return this.http.post<User>(this.userUrl, user);
  }
  setter(user:User){
    this.user=user;
  }

  getter(){
    return this.user
  }

}
