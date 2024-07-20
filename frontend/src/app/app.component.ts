import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { EditExpenseComponent } from './edit-expense/edit-expense.component';
import { SummaryComponent } from './summary/summary.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ViewExpensesComponent } from './view-expenses/view-expenses.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    ViewExpensesComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    AddExpenseComponent,
    EditExpenseComponent,
    SummaryComponent,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatButtonModule

  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
