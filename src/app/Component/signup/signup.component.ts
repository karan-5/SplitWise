import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent {
  
  countId = 1;
  userEmail = "";
  userForm = this.formBuilder.group({
    id: [''],
    name: [''],
    phone: [''],
    email: [''],
    password: [''],
    linkedUsers: [{}],
  });

  constructor(private formBuilder: FormBuilder,private authService: AuthServiceService,private router: Router){
    // 
  }

  onSignUp(){
    
    this.userForm.value.id = this.userForm.value.email;
    this.authService.updateCurrentUser({email:this.userForm.value.email}).subscribe();
    this.authService.register(this.userForm.value).subscribe(() => {
      this.router.navigate(['dashboard']);
    });
  }

}
