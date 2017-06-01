import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

	newUser = {
      company: '',
      contactName: '',
      username: '',
      password: '',
      contactPhone: '',
      address: '',
      city: '',
      state: '',
      country: '',
      role: "INVESTOR"
  };

  user: any;
  error: string;


  constructor(
  	private session: SessionService, 
    private router: Router
  ) { }

  ngOnInit() {
  }

  signupInvestor() {
      console.log(this.newUser);
  	this.session.signupInvestor(this.newUser)
      .subscribe(result => {
          if (result === true) {
              // login successful
              console.log('result ok', result);
              this.router.navigate(['/investors']);
              this.newUser = {
                company: '',
                contactName: '',
                username: '',
                password: '',
                contactPhone: '',
                address: '',
                city: '',
                state: '',
                country: '',
                role: "INVESTOR"
            };
            
          } else {
          		console.log('result not ok', result);
              // login failed
              // this.error = 'Username or password is incorrect';
          }
      });
  }
}
