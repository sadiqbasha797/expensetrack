import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { Router } from '@angular/router';  // Import Router
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router  // Inject Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (res) => {
          console.log('Login successful', res);
          // Navigate to the dashboard or another route
          this.router.navigate(['/dashboard']);  // Redirect to Dashboard
        },
        error: (err) => {
          console.error('Login error', err);
          console.log(localStorage.getItem('email'));
          // Optionally handle login error, e.g., show an error message
        }
      });
    }
  }
  
}