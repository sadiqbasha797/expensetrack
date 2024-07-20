// src/app/services/expense.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Expense } from '../models/expense';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private apiUrl = 'http://localhost:3000/api/expenses';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`  // Ensure this is the correct format expected by your backend
    });
  }

  getExpenses(): Observable<Expense[]> {
    return this.http.get<Expense[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  getExpenseById(id: string): Observable<Expense> {
    return this.http.get<Expense>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  addExpense(expense: Expense): Observable<Expense> {
    return this.http.post<Expense>(this.apiUrl, expense, { headers: this.getAuthHeaders() });
  }

  updateExpense(id: string, expense: Expense): Observable<Expense> {
    return this.http.put<Expense>(`${this.apiUrl}/${id}`, expense, { headers: this.getAuthHeaders() });
  }

  deleteExpense(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
}
