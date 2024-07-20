import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpenseService } from '../services/expenses.services';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-edit-expense',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './edit-expense.component.html',
  styleUrl: './edit-expense.component.css'
})
export class EditExpenseComponent implements OnInit {
  expenses: any[] = [];
  editForm!: FormGroup;
  currentExpense: any = null;

  constructor(private expenseService: ExpenseService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadExpenses();
    this.editForm = this.fb.group({
      date: ['', Validators.required],
      amount: ['', [Validators.required, Validators.pattern(/^\d+\.?\d{0,2}$/)]],
      category: ['', Validators.required],
      description: ['']
    });
  }

  loadExpenses(): void {
    this.expenseService.getExpenses().subscribe(data => {
      this.expenses = data;
    });
  }

 openEditModal(expense: any): void {
  this.currentExpense = expense;
  this.editForm.setValue({
    date: expense.date.split('T')[0], // Format date correctly
    amount: expense.amount,
    category: expense.category,
    description: expense.description || ''
  });

  const modal = document.getElementById('editModal');
  if (modal !== null) {
    modal.style.display = 'block';
  }
}

closeEditModal(): void {
  const modal = document.getElementById('editModal');
  if (modal !== null) {
    modal.style.display = 'none';
  }
}


  onUpdate(): void {
    if (this.editForm.valid) {
      this.expenseService.updateExpense(this.currentExpense._id, this.editForm.value).subscribe({
        next: (res) => {
          console.log('Expense updated successfully', res);
          this.loadExpenses();
          this.closeEditModal();
        },
        error: (err) => {
          console.error('Error updating expense', err);
        }
      });
    }
  }

  onDelete(expenseId: string): void {
    this.expenseService.deleteExpense(expenseId).subscribe({
      next: (res) => {
        console.log('Expense deleted successfully', res);
        this.loadExpenses(); // Reload the list after deletion
      },
      error: (err) => console.error('Error deleting expense', err)
    });
  }
}