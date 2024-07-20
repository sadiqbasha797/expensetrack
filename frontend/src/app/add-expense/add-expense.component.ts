
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExpenseService } from '../services/expenses.services';
import { CategoryService } from '../services/category.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-add-expense',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './add-expense.component.html',
  styleUrl: './add-expense.component.css'
})
export class AddExpenseComponent implements OnInit {
  expenseForm!: FormGroup;
  categories: string[] = ['Food', 'Transportation', 'Entertainment', 'Rent', 'Bills'];
  showOtherCategory: boolean = false;

  constructor(
    private fb: FormBuilder,
    private expenseService: ExpenseService,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.loadCategories();
  }

  initializeForm(): void {
    this.expenseForm = this.fb.group({
      date: ['', Validators.required],
      amount: ['', [Validators.required, Validators.pattern(/^\d+\.?\d{0,2}$/)]],
      category: ['', Validators.required],
      otherCategory: [{value: '', disabled: true}, Validators.required],
      description: ['']
    });

    this.expenseForm.get('category')?.valueChanges.subscribe(value => {
      if (value === 'Others') {
        this.showOtherCategory = true;
        this.expenseForm.get('otherCategory')?.enable();
      } else {
        this.showOtherCategory = false;
        this.expenseForm.get('otherCategory')?.disable();
      }
    });
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories.map(c => c.name);
    });
  }

  onSubmit(): void {
    if (this.expenseForm.valid) {
      const formData = this.expenseForm.value;
      const finalCategory = formData.category === 'Others' ? formData.otherCategory : formData.category;

      if (this.categories.indexOf(finalCategory) === -1) {
        this.categoryService.addCategory({ name: finalCategory }).subscribe({
          next: category => {
            console.log('New category added:', category);
            this.submitExpense(finalCategory);
          },
          error: err => {
            console.error('Failed to add new category', err);
          }
        });
      } else {
        this.submitExpense(finalCategory);
      }
    }
  }

  submitExpense(category: string): void {
    const expenseData = {...this.expenseForm.value, category};
    delete expenseData.otherCategory; // Clean up form data

    this.expenseService.addExpense(expenseData).subscribe({
      next: res => {
        console.log('Expense added successfully', res);
        this.expenseForm.reset();
        this.showOtherCategory = false; // Reset the additional category input
      },
      error: err => console.error('Error adding expense', err)
    });
  }
}