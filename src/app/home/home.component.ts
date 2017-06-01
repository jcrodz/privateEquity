import { Component, OnInit } from '@angular/core';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { SessionService } from '../session.service';
import { Router } from '@angular/router';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [{provide: CarouselConfig, useValue: {interval: 4000, noPause: true}}]
})
export class HomeComponent implements OnInit {

  user = {
    _id: '',
    contactName: '',
    username: '',
    password: '',
    contactPhone: '',
    address: '',
    city: '',
    state: '',
    country: '',
    role: '',
    investment: '',
    reports: ''
  };
  
  error: string;

  constructor(
    private session: SessionService, 
    private router: Router
  ) { }

  ngOnInit() {
  }

  login() {
    console.log(this.user);
    this.session.login(this.user)
				        .subscribe(result => {
				            if (result === true) {
                      // login successful
                      this.user = JSON.parse(localStorage.user);
                      if (this.user.role === 'ADMIN') {
			                this.router.navigate(['/dashboard']);
                      location.reload();
                      }
                      else {
                        this.router.navigate([`/dashboard-investor/${this.user._id}`]);
                        location.reload();
                      }
			         			} else {
			                // login failed
			                this.error = 'Username or password is incorrect';
				            }
				        });
  }

}