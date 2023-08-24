import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { concatMap } from 'rxjs';

import { UserDataService } from 'src/app/services/user-data.service';
import { User } from 'src/app/shared/models';
import { AuthServiceService } from 'src/app/services/auth-service.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit {

  constructor(private userDataService:UserDataService,private router:Router,private authService:AuthServiceService){
  }
  userGroups!:[];
  userList:User[] = [];
  currentUser!:string;
  ngOnInit(): void {
    this.authService.getCurrentUser().pipe(
      concatMap((firstResponse) => {
        this.currentUser = firstResponse.email;
        return this.userDataService.getUserList();
      })
    ).subscribe({
      next:(res) => {
        res.forEach((value:User) => {
          if(value.email != this.currentUser){
            this.userList.push(value);
          }
        });
      }
    });
    
    this.userDataService.getGroupList().subscribe(res => {
      this.userGroups = res;
    });
  }
}
