import { registerDispatcher } from '@angular/core/primitives/event-dispatch';
import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { EditExpenseComponent } from './edit-expense/edit-expense.component';
import { SummaryComponent } from './summary/summary.component';
import { ViewExpensesComponent } from './view-expenses/view-expenses.component';

export const routes: Routes = [
    
    {
        path : "",
        component : DashboardComponent
    },
    {
        path : "register",
        component : RegisterComponent
    },
    {
        path : "login",
        component : LoginComponent
    },
    {
        path : "dashboard",
        component : DashboardComponent
    },
    {
        path : "addexpenses",
        component : AddExpenseComponent
    },
    {
        path : "editexpenses",
        component : EditExpenseComponent
    },
    {
        path : "summary",
        component : SummaryComponent
    },
    {
        path : "view",
        component : ViewExpensesComponent
    }
];
