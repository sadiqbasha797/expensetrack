import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SummaryService } from '../services/summary.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.css'
})
export class SummaryComponent implements OnInit {
  dateForm!: FormGroup;
  totals: any = {};
  categoryTotals: any[] = [];
  dailyExpenses: any[] = [];
  monthlyExpenses: any = {};

  constructor(private fb: FormBuilder, private summaryService: SummaryService) {}

  ngOnInit(): void {
    this.dateForm = this.fb.group({
      dateInput: ['']
    });
    this.fetchCategoryTotals();
  }

  fetchCategoryTotals(): void {
    this.summaryService.getExpensesByCategory().subscribe({
      next: (data) => {
        this.categoryTotals = data;
      },
      error: (error) => {
        console.error('Error fetching category totals:', error);
      }
    });
  }

  fetchExpensesForDay(): void {
    const date = this.dateForm.value.dateInput;
    if (date) {
      this.summaryService.getExpensesForDay(date).subscribe({
        next: (data) => {
          this.dailyExpenses = data;
        },
        error: (error) => {
          console.error('Error fetching daily expenses:', error);
        }
      });
    }
  }

  fetchExpensesForMonth(): void {
    const date = new Date(this.dateForm.value.dateInput);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    this.summaryService.getExpensesForMonth(year, month).subscribe({
      next: (data) => {
        this.monthlyExpenses = data;
      },
      error: (error) => {
        console.error('Error fetching monthly expenses:', error);
      }
    });
  }
}