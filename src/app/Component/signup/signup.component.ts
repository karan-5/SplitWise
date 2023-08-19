import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  
  countId=1;
  constructor(private formBuilder:FormBuilder,private authService:AuthServiceService,private router:Router){

  }
  userForm=this.formBuilder.group({
    id:[''],
    name:[''],
    phone:[''],
    email:[''],
    password:['']
  })

  onSignUp(){
   this.userForm.value.id=this.userForm.value.email;
   this.authService.register(this.userForm.value).subscribe(res=>{
   // this.toastrService.success("Successfully registered");
    this.router.navigate(['dashboard']);
    
   });
  }
}
