import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../shared/models';
import { concatMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  constructor(private http: HttpClient) {}

  getUserById(id: string) {
    return this.http.get<User>('http://localhost:3000/users/' + id);
  }
  getUserList() {
    return this.http.get<[]>('http://localhost:3000/users');
  }
  getGroupList() {
    return this.http.get<[]>('http://localhost:3000/groups');
  }

  getExpenseList(id: string) {
    return this.http.get<object>(`http://localhost:3000/users/${id}`);
  }

  //post put patch

  updateUsersExpenses(email: string, emailSecond: string, data: object) {
    return this.http.get(`http://localhost:3000/users/${email}`).pipe(
      concatMap((res: any) => {
        // eslint-disable-next-line no-prototype-builtins
        if (res.linkedUsers.hasOwnProperty(emailSecond)) {
          const linkedUsers = res.linkedUsers; //{test@gmail:[{}]}
          linkedUsers[emailSecond] = [...res.linkedUsers[emailSecond], data];
          return this.http.patch(`http://localhost:3000/users/${email}`, {
            linkedUsers,
          });
        } else {
          const linkedUsers = res.linkedUsers; //{}
          linkedUsers[emailSecond] = [data]; //{test@gmail:[{}]}
          return this.http.patch(`http://localhost:3000/users/${email}`, {
            linkedUsers,
          });
        }
      })
    );

    //  .subscribe({
    //   next: (res:any) => {
    //     if (res) {
    //        if(res.linkedUsers.hasOwnProperty(emailSecond))
    //        {
    //         let linkedUsers = res.linkedUsers; //{test@gmail:[{}]}
    //         linkedUsers[emailSecond]=[... res.linkedUsers[emailSecond],data];
    //         this.http.patch(`http://localhost:3000/users/${email}`,{linkedUsers}).subscribe({
    //           next:(res)=>{

    //           }
    //         });
    //        }
    //        else{
    //         let linkedUsers = res.linkedUsers; //{}
    //         linkedUsers[emailSecond]=[data];//{test@gmail:[{}]}
    //         this.http.patch(`http://localhost:3000/users/${email}`,{linkedUsers}).subscribe({
    //           next:(res)=>{
    //        }})
    //        }
    //     }
    //   },
    //   error: (error) => {},
    // });
    // this.http.get(`http://localhost:3000/users/${email}`).subscribe({
    //   next: (res:any) => {
    //     if (res) {
    //        if(res.linkedUsers.hasOwnProperty(emailSecond))
    //        {
    //         let linkedUsers = res.linkedUsers; //{test@gmail:[{}]}
    //         linkedUsers[emailSecond]=[... res.linkedUsers[emailSecond],data];
    //         this.http.patch(`http://localhost:3000/users/${email}`,{linkedUsers}).subscribe({
    //           next:(res)=>{

    //           }
    //         });
    //        }
    //        else{
    //         let linkedUsers = res.linkedUsers; //{}
    //         linkedUsers[emailSecond]=[data];//{test@gmail:[{}]}
    //         this.http.patch(`http://localhost:3000/users/${email}`,{linkedUsers}).subscribe({
    //           next:(res)=>{
    //        }})
    //        }
    //     }
    //   },
    //   error: (error) => {},
    // });
    // this.http.put(`http://localhost:3000/users/${email}/linkedUsers`,{[emailSecond]:data});
  }
}
