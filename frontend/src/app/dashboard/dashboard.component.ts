import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  userName: string = '';
  userEmail: string = '';
  ngOnInit(): void {
    this.fetchUserDetails();
  }
  
  fetchUserDetails(): void {
    this.userName = localStorage.getItem('name') || 'Default User'; // Default to 'Default User' if not found
    this.userEmail = localStorage.getItem('token') || 'No email provided';
    console.log("Fetched from LocalStorage:", this.userName, this.userEmail);
  }
  
}
