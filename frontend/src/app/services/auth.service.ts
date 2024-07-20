// src/app/services/auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/users'; // Adjust this to your API endpoint

  constructor(private http: HttpClient,private router: Router ) { }

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post<{accessToken: string, id: string, username: string, email: string}>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap(res => {
          console.log("Login response: ", res);
          if (res && res.accessToken) {
            localStorage.setItem('token', res.accessToken);
            localStorage.setItem('userId', res.id); // Changed from 'userId' to 'id'
            localStorage.setItem('name', res.username); // Changed from 'name' to 'username'
            localStorage.setItem('email', res.email);
          }
        })
      );
}

  

  register(data: { username: string, email: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, data);
  }

  // Method to retrieve token from local storage
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Method to clear user data and token when logging out
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    this.router.navigate(['/login']);

  }
}
