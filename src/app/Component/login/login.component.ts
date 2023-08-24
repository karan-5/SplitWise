import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent {

  constructor(private router: Router, private route: ActivatedRoute,private formBuilder: FormBuilder,private authService: AuthServiceService) {}
  userData: any = {};
  userForm = this.formBuilder.group({
    email: [''],
    password: [''],
  });
   
  goToSignUp() {
    this.router.navigate(['../signUp'], { relativeTo: this.route });
  }

  onLoginIn(){
    if(this.userForm.valid){
      // rxjs 
      this.authService.getByCode(this.userForm.value.email as string).subscribe(res => {
        this.userData = res;
        if(this.userForm.value.password as string === this.userData.password){
          this.authService.updateCurrentUser({email:this.userForm.value.email}).subscribe();
          this.router.navigate(['dashboard']);
        }
      });
    }
  }
}
