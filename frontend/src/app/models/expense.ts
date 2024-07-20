// src/app/models/expense.ts

export interface Expense {
    _id?: string; // Optional for new expenses
    user: string;
    date: Date;
    amount: number;
    category: string;
    description?: string; // Optional field
  }

