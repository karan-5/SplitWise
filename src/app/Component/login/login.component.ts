import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  constructor(private router: Router, private route: ActivatedRoute) {}

  goToSignUp() {
    this.router.navigate(['../signUp'], { relativeTo: this.route });
  }

  onGoogleSignIn(googleUser: any) {
    let profile = googleUser.getBasicProfile();
    console.log(profile);
    console.log('ID: ' + profile.getId());
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());
  }
}
