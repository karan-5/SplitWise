import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Component/login/login.component';
import { SignupComponent } from './Component/signup/signup.component';
import { NotFoundComponent } from './Component/not-found/not-found.component';

const routes: Routes = [
  {
    path: "",
    redirectTo:"/login",
    pathMatch:"full"
  },
  {
    path:"login",
    component:LoginComponent
  },
  {
    path:"signUp",
    component:SignupComponent
  },
  {
    path:"**",
    component:NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
