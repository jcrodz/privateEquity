import { Component, OnInit } from '@angular/core';
import { DashService } from '../dash.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-fund',
  templateUrl: './fund.component.html',
  styleUrls: ['./fund.component.css']
})
export class FundComponent implements OnInit {
    successMessage = false;
    fundName: String;
    openDate: Date;
    totalInvestment: Number;
    funds;

	newFund = {
      fundName: '',
      openDate: '',
      totalInvestment: ''
  };

  constructor(
  	private dash: DashService, 
    private router: Router
  ) { }

  ngOnInit() {
    this.getFunds();
  }

  addFund() {
      console.log(this.newFund);
  	this.dash.addFund(this.newFund)
      .subscribe(result => {
          if (result) {
              // login successful
              console.log('result ok', result);
              this.successMessage = true;
              this.newFund = {
                fundName: '',
                openDate: '',
                totalInvestment: ''
            };
            this.getFunds();
          } else {
              this.successMessage = false;
          		console.log('result not ok', result);
          }
      });
  }

  getFunds() {
    this.dash.getFunds()
      .subscribe((funds) => {
        this.funds = funds;
        console.log('in angular 2 all funds', this.funds);
      });
  }




}
