import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserDataService } from 'src/app/services/user-data.service';
import { User } from 'src/app/shared/models';


@Component({
  selector: 'app-user-expense-details',
  templateUrl: './user-expense-details.component.html',
  styleUrls: ['./user-expense-details.component.css']
})
export class UserExpenseDetailsComponent implements OnInit {
  constructor(private route:ActivatedRoute,private userDataService:UserDataService) {
  }
  userId!:string;
  userDetails!:User;
  showAddition=false;
  ngOnInit(): void {
    this.route.paramMap.subscribe(params=>{
      this.userId=params.get('id') as string;
    });
    console.log(this.userId)
    this.userDataService.getUserById(this.userId).subscribe((res)=>{
      this.userDetails=res;
    })
    
  
  }
  onAddExpenseBtnClick(){ 
    this.showAddition=true;
  }
  OnAddClick(){
    this.showAddition=false;
    
  }

}
