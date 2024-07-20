import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) { }

  onRegister(): void {
    const userData = {
      username: this.username,
      email: this.email,
      password: this.password
    };
    this.authService.register(userData).subscribe({
      next: (res) => {
        console.log('User registered successfully', res);
      },
      error: (err) => {
        console.error('Registration error', err);
      }
    });
  }
}