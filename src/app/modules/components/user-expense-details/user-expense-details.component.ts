import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { User } from 'src/app/shared/models';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { concatMap } from 'rxjs';

@Component({
  selector: 'app-user-expense-details',
  templateUrl: './user-expense-details.component.html',
  styleUrls: ['./user-expense-details.component.css']
})
export class UserExpenseDetailsComponent implements OnInit {
  constructor(private route:ActivatedRoute,private userDetailsServices:UserDataService,private formBuilder:FormBuilder ,private userDataService:UserDataService,private authService:AuthServiceService,private router:Router) {
  }
  userId!:string;
  currentUser!:string;
  currentUserName!:string;
  userDetails!:User;
  expenseList!:{amount:string,description:string,paidBy:string,date:string,split:string}[];
  showAddition = false;
  totalMoney = 0;
  showSettleWindow = false;
  getUserExpensesList(){
    this.totalMoney = 0;
    this.authService.getCurrentUser().subscribe((res)=>{
      this.currentUser = res.email;
      this.authService.getByCode(this.currentUser).subscribe((res:User)=>{
        this.currentUserName = res.name;
      });
      this.userDataService.getExpenseList(this.userId).subscribe({
        next: (res: any) => {
          this.expenseList = res.linkedUsers[this.currentUser];
          this.expenseList.reverse();
          this.expenseList?.forEach((value)=>{
            if(value.paidBy == 'false'){
              this.totalMoney += value.split == "true" ? Number(value.amount) / 2 : Number(value.amount);
            }
            else{
              this.totalMoney -= value.split == "true" ? Number(value.amount) / 2 : Number(value.amount);
            }
          });
        },
      });
    });
    
    this.showAddition = false;
    
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params=>{
      this.userId = params.get('id') as string;
      this.userDataService.getUserById(this.userId).subscribe((res)=>{
        this.userDetails = res;
        this.getUserExpensesList();
      });
    });
  }

  userForm = this.formBuilder.group({
    amount:[''],
    description:[''],
    paidBy:['true'],
    date: [''],
    split:['true']
  });
  date = new Date();
  currentDate = this.date.toDateString();

  Math(temp:number){
    return Math.abs(temp);
  }

  getExpense(split:string, amount:string){
    return split == "true" ? Number(amount) / 2 :  amount; 
  }
  onAddExpenseBtnClick(){ 
    this.showAddition = true;
  }
  onSettleUpBtnClick(){ 
    this.showSettleWindow = true;
  }
  OnAddClick(){
  
  }
  settleUp(){
    this.showSettleWindow = false;
    this.userForm.value.date = this.currentDate;
    this.userForm.value.amount = Math.abs(this.totalMoney). toString();
    this.userForm.value.split = 'false';
    this.userForm.value.description = `${this.currentUserName} paid: `;
    this.userDetailsServices.updateUsersExpenses(this.currentUser,this.userId,this.userForm.value).pipe(
      concatMap(() => {
        return this.userDetailsServices.updateUsersExpenses(this.userId,this.currentUser,{... this.userForm.value,paidBy:'false'});
      })
    ).subscribe({
      next:() => {
        this.getUserExpensesList();
      }
    });
  }

  

}
