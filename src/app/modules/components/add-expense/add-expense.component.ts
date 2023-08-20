import { Component,EventEmitter,Input,OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css']
})
export class AddExpenseComponent implements OnInit {
 
  @Input() emailSecond!:string;
  @Output() expensesAdded= new EventEmitter;
  userEmail:string="";
  date=new Date();
  currentDate=this.date.toDateString()
  constructor(private formBuilder:FormBuilder,private authService:AuthServiceService,private userDetailsServices:UserDataService,private route:ActivatedRoute,private router:Router){
  }
   ngOnInit():  void {
    this.authService.getCurrentUser().subscribe((res)=>{
      this.userEmail=res.email;
    })
    this.route.paramMap.subscribe(params=>{
    this.emailSecond=params.get('id') as string; debugger//
    })
  }
  userForm=this.formBuilder.group({
    amount:[''],
    description:[''],
    paidBy:['true'],
    date: ['']
  })

  onAddExpense(){
    
    this.userForm.value.date=this.currentDate;
    this.userDetailsServices.updateUsersExpenses(this.userEmail,this.emailSecond,this.userForm.value);
    this.userDetailsServices.updateUsersExpenses(this.emailSecond,this.userEmail,{... this.userForm.value,paidBy:'false'});
    this.expensesAdded.emit();
  }
}
