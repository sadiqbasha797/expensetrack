import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExpenseService } from '../services/expenses.services';
import { Expense } from '../models/expense';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-view-expenses',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './view-expenses.component.html',
  styleUrl: './view-expenses.component.css'
})
export class ViewExpensesComponent implements OnInit {
  expenses: Expense[] = [];
  editForm: FormGroup;
  isModalOpen = false; 
  currentExpense: Expense | null = null;  

  constructor(private expenseService: ExpenseService, private fb: FormBuilder) {
    this.editForm = this.fb.group({
      _id: [''],
      date: ['', Validators.required],
      amount: ['', [Validators.required, Validators.pattern(/^\d+\.?\d{0,2}$/)]],
      category: ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.loadExpenses();
    
  }

  loadExpenses(): void {
    this.expenseService.getExpenses().subscribe({
      next: (expenses) => this.expenses = expenses,
      error: (err) => console.error('Failed to load expenses:', err)
    });
  }
  openEditModal(expense: Expense): void {
    this.currentExpense = expense;
    this.editForm.setValue({
      _id: expense._id,
      date: this.formatDate(expense.date), 
      amount: expense.amount,
      category: expense.category,
      description: expense.description || ''
    });
    this.isModalOpen = true;
  }

  closeEditModal(): void {
    this.isModalOpen = false;
  }

  formatDate(date: Date): string {
    const d = new Date(date);
    return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`;
  }

  onUpdate(): void {
    if (this.editForm.valid && this.currentExpense) {
        const formValue = this.editForm.value;
        formValue.date = new Date(formValue.date); 

        this.expenseService.updateExpense(this.currentExpense._id ?? 'default-id', formValue).subscribe({
            next: () => {
                console.log('Expense updated successfully');
                this.closeEditModal();
                this.loadExpenses(); 
            },
            error: (err) => console.error('Error updating expense:', err)
        });
    }
}

  onDelete(expenseId: string): void {
    this.expenseService.deleteExpense(expenseId).subscribe({
      next: () => {
        console.log('Expense deleted successfully');
        this.loadExpenses();
      },
      error: (err) => console.error('Error deleting expense:', err)
    });
  }
}
