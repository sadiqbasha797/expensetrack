import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { RouterOutlet,RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,RouterOutlet],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private authService: AuthService, private router: Router) {}

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);  // Redirect to login or home page after logout
  }
}
