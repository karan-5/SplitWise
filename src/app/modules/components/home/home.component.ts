import { Component } from '@angular/core';
// import {MatDialogModule} from '@angular/material/dialog';
import { Route, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  showAddition = false;
  addExpenseForm = this.formBuilder.group({
    amount:[''],
    description:['']
  });
  constructor(private router:Router,private formBuilder:FormBuilder){

  } 
  addExpense(){
    this.showAddition = true;
  }
}
