// src/app/services/category.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://localhost:3000/api/categories';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  getCategoryById(id: string): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.apiUrl, category, { headers: this.getAuthHeaders() });
  }

  updateCategory(id: string, category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.apiUrl}/${id}`, category, { headers: this.getAuthHeaders() });
  }

  deleteCategory(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
}
