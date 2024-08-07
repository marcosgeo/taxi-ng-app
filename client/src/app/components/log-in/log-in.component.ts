import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';

class UserData {
  constructor(
    public username: string = '',
    public password: string = '',
  ) {}
}

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  user: UserData = new UserData();

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  onSubmit(): void {
    this.authService.logIn(
      this.user.username, this.user.password
    ).subscribe({
      complete: () => this.router.navigateByUrl(''),
      error: (error) => console.error(error),
    });
  }

  ngOnInit(): void {
  }

}
