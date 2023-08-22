import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../shared/models';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  apiUrl = 'http://localhost:3000/users';
  constructor(private http:HttpClient) { }

  getAll(){
    return this.http.get(this.apiUrl);
  }

  getByCode(code:string){
    return this.http.get<User>(this.apiUrl + '/' + code);
  }

  register(inputData:{}){
    return this.http.post(this.apiUrl,inputData);
  }

  updateCurrentUser(email:any){
    return this.http.post(`http://localhost:3000/currentUser`,email);
  }

  getCurrentUser(){
    return this.http.get<{email:string}>('http://localhost:3000/currentUser');
  }
}
