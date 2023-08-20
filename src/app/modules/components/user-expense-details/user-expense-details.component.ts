import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { User } from 'src/app/shared/models';


@Component({
  selector: 'app-user-expense-details',
  templateUrl: './user-expense-details.component.html',
  styleUrls: ['./user-expense-details.component.css']
})
export class UserExpenseDetailsComponent implements OnInit {
  constructor(private route:ActivatedRoute,private userDataService:UserDataService,private authService:AuthServiceService) {
  }
  userId!:string;
  currentUser!:string;
  userDetails!:User;
  expenseList!:{amount:string,description:string,paidBy:string,date:string}[];
  showAddition=false;
  ngOnInit(): void {
    this.route.paramMap.subscribe(params=>{
      this.userId=params.get('id') as string;
    });
    
    this.userDataService.getUserById(this.userId).subscribe((res)=>{
      this.userDetails=res;
      
    })
    this.authService.getCurrentUser().subscribe((res)=>{
      this.currentUser=res.email;
    })
    
    this.userDataService.getExpenseList(this.userId).subscribe({
      next: (res:any)=>{
        this.expenseList=res.linkedUsers[this.currentUser];
      },
    })
    
  }

  getExpense(index:string){
    return Number(index)/2;
  }
  onAddExpenseBtnClick(){ 
    this.showAddition=true;
  }
  OnAddClick(){
    this.showAddition=false;
    
  }

}
