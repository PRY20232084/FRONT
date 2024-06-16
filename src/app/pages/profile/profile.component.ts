import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
  loggedUser: any;

  constructor(private authService: AuthService,private router: Router,) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe(x => {
      this.loggedUser = x;
      if (!this.loggedUser || Object.keys(this.loggedUser).length === 0) {
        this.router.navigate(['login']);
      }
    });
  }
}
