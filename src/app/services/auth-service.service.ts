import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  apiUrl='http://localhost:3000/users'
  constructor(private http:HttpClient) { }

  getAll(){
    return this.http.get(this.apiUrl)
  }

  getByCode(code:string){
    return this.http.get(this.apiUrl+'/'+code)
  }

  register(inputData:{}){
    return this.http.post(this.apiUrl,inputData);
  }
}
