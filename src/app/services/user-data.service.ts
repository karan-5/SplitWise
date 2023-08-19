import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../shared/models';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private http:HttpClient) {
  }

  getUserById(id:string){
    return this.http.get<User>('http://localhost:3000/users/'+id)
  }
  getUserList(){
    return this.http.get<[]>("http://localhost:3000/users");
  }
  getGroupList(){
    return this.http.get<[]>("http://localhost:3000/groups");
  }

  updateUsersExpenses(email:string,emailSecond:string,data:{}){
    console.log(email,data)
    this.http.post(`http://localhost:3000/users/${email}/linkedUsers`,{emailSecond:data});
  }
}
