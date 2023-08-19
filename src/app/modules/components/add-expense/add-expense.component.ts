import { Component,OnInit } from '@angular/core';
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
 
  userEmail:string="";
  emailSecond: string="";
  constructor(private formBuilder:FormBuilder,private authService:AuthServiceService,private userDetailsServices:UserDataService,private route:ActivatedRoute){
  }
  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe((res)=>{
      this.userEmail=res.email;
    })
  }
  userForm=this.formBuilder.group({
    amount:[''],
    description:['']
  })

  onAddExpense(){
    
    this.route.paramMap.subscribe(params=>{
    this.emailSecond=params.get('') as string;
    })
    
    // this.userDetailsServices.updateUsersExpenses(this.userEmail,{:this.userForm.value})
  }
}
