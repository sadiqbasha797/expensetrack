import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SummaryService {
  private apiUrl = 'http://localhost:3000/api/summary'; // API endpoint

  constructor(private http: HttpClient) { }

  // Method to create headers
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
  }

  // Fetch total spending summary
  getTotalSpending(): Observable<any> {
    return this.http.get(`${this.apiUrl}/total`, { headers: this.getHeaders() });
  }

  // Fetch expenses by category
  getExpensesByCategory(): Observable<any> {
    return this.http.get(`${this.apiUrl}/by-category`, { headers: this.getHeaders() });
  }

  // Fetch expenses for a specific day
  getExpensesForDay(dateString: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/expenses/day?date=${dateString}`, { headers: this.getHeaders() });
  }

  // Fetch expenses for a specific month
  getExpensesForMonth(year: number, month: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/expenses/month?year=${year}&month=${month}`, { headers: this.getHeaders() });
  }
}
