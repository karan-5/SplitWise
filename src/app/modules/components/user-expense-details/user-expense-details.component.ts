import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { User } from 'src/app/shared/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-expense-details',
  templateUrl: './user-expense-details.component.html',
  styleUrls: ['./user-expense-details.component.css']
})
export class UserExpenseDetailsComponent implements OnInit {
  constructor(private route:ActivatedRoute,private userDataService:UserDataService,private authService:AuthServiceService,private router:Router) {
  }
  userId!:string;
  currentUser!:string;
  userDetails!:User;
  expenseList!:{amount:string,description:string,paidBy:string,date:string}[];
  showAddition=false;
  totalMoney=0;
  showSettleWindow=false;
  getUserExpensesList(){
    this.authService.getCurrentUser().subscribe((res)=>{
      this.currentUser=res.email;
    })
    
    this.userDataService.getExpenseList(this.userId).subscribe({
      next: (res:any)=>{
        this.expenseList=res.linkedUsers[this.currentUser];
        this.expenseList?.forEach((value)=>{
          if(value.paidBy=='false'){
           this.totalMoney+=Number(value.amount)/2;
          }
          else{
           this.totalMoney-=Number(value.amount)/2;
          }
   
          console.log(this.totalMoney);
        })
      },
    })
    this.showAddition=false;
    
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params=>{
      this.userId=params.get('id') as string;
    });
    
    this.userDataService.getUserById(this.userId).subscribe((res)=>{
      this.userDetails=res;
      
    })
    this.getUserExpensesList();
   
    
  }
  Math(temp:number){
    return Math.abs(temp)
  }

  getExpense(index:string){
    return Number(index)/2;
  }
  onAddExpenseBtnClick(){ 
    this.showAddition=true;
  }
  onSettleUpBtnClick(){ 
    this.showSettleWindow=true;
  }
  OnAddClick(){
  
  }
  settleUp(){
    this.totalMoney=0;
    this.showSettleWindow=false;
  }

}
