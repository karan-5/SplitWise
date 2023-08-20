import { Component,Input,OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css']
})
export class AddExpenseComponent implements OnInit {
 
  @Input() emailSecond!:string;
  userEmail:string="";
  constructor(private formBuilder:FormBuilder,private authService:AuthServiceService,private userDetailsServices:UserDataService,private route:ActivatedRoute){
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
  })

  onAddExpense(){
    
    console.log(this.emailSecond)
    this.userDetailsServices.updateUsersExpenses(this.userEmail,this.emailSecond,this.userForm.value);
    this.userDetailsServices.updateUsersExpenses(this.emailSecond,this.userEmail,{... this.userForm.value,paidBy:'false'});
  }
}
