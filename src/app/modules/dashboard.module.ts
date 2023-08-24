import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddExpenseComponent } from './components/add-expense/add-expense.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { UserExpenseDetailsComponent } from './components/user-expense-details/user-expense-details.component';

@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    AddExpenseComponent,
    UserListComponent,
    SidebarComponent,
    UserExpenseDetailsComponent
  ],
  imports: [CommonModule, DashboardRoutingModule,ReactiveFormsModule],
})

export class DashboardModule {}
