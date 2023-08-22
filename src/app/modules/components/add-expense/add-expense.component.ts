import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { concatMap, takeUntil } from 'rxjs';
import { Subject } from 'rxjs';

import { AuthServiceService } from 'src/app/services/auth-service.service';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css']
})
export class AddExpenseComponent implements OnInit, OnDestroy {
  @Input() emailSecond!: string;
  @Output() expensesAdded = new EventEmitter();

  userEmail: string = '';
  currentDate: string = new Date().toDateString();
  userForm: FormGroup;

  private destroy$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthServiceService,
    private userDetailsServices: UserDataService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.userForm = this.formBuilder.group({
      amount: ['', [Validators.required]],
      description: ['', [Validators.required]],
      paidBy: ['true'],
      date: [this.currentDate],
      split: ['true']
    });
  }

  ngOnInit(): void {
    this.authService.getCurrentUser().pipe(takeUntil(this.destroy$)).subscribe(
      (res: any) => {
        this.userEmail = res.email;
      },
      () => {
      }
    );

    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      this.emailSecond = params.get('id') as string;
      // Debugging code here
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onAddExpense() {
    this.userForm.value.date = this.currentDate;
    this.userDetailsServices
      .updateUsersExpenses(this.userEmail, this.emailSecond, this.userForm.value)
      .pipe(
        concatMap(() => {
          return this.userDetailsServices.updateUsersExpenses(this.emailSecond, this.userEmail, {
            ...this.userForm.value,
            paidBy: 'false'
          });
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(
        {
          next: () => {
            this.expensesAdded.emit();
          },
          error: () => {
           
          }
        }
      );
  }
}
