import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DashService } from '../dash.service';
import { AlertModule } from 'ngx-bootstrap/alert';

@Component({
  selector: 'app-investment',
  templateUrl: './investment.component.html',
  styleUrls: ['./investment.component.css']
})
export class InvestmentComponent implements OnInit {
  successMessage = false;
  successFund = false;
  investor: Object = {};
  investment: Object = {};
  funds;
  constructor(
  	private router: Router,
  	private route: ActivatedRoute,
    private dashService: DashService
  ) {}

  ngOnInit() {
    console.log(this.route.params['_value'].id)
    this.route.params.subscribe(params => {
      this.getInvestorDetails(params['id']);
    })
    console.log(this.investor);
    this.getFunds();
    console.log(this.funds);
  }

  getFunds() {
    this.dashService.getFunds()
      .subscribe((funds) => {
        this.funds = funds;
        console.log(this.funds);
      });
  }

  getInvestorDetails(id) {
    console.log(id);
    this.dashService.get(id)
      .subscribe((investor) => {
        this.investor = investor;
      });
      
  }

  add() {
    this.dashService.addInvestment(this.investment, this.investor)
    .subscribe((investment) => {
      if (investment) {
        this.successMessage = true;
      }else {
        this.successMessage = false;
      }
    });
  }

}
