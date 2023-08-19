import { Component,OnInit } from '@angular/core';
import { UserDataService } from 'src/app/services/user-data.service';
import { User } from 'src/app/shared/models';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private userDataService:UserDataService,private router:Router){
  }
  userGroups!:[];
  userList!:User[];
  ngOnInit(): void {
    this.userDataService.getUserList().subscribe(res=>{
      this.userList=res;
    });
    this.userDataService.getGroupList().subscribe(res=>{
      this.userGroups=res;
    });
  }

  // onUserClick(userEmail:string,index:number){
  //   this.router.navigate(['dashboard','home','index']);
  // }
}
