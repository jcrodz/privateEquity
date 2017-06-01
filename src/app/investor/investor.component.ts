import { Component, OnInit } from '@angular/core';
import { DashService } from '../dash.service';

@Component({
  selector: 'app-investor',
  templateUrl: './investor.component.html',
  styleUrls: ['./investor.component.css']
})
export class InvestorComponent implements OnInit {
  investors;
  constructor(private investor: DashService) { }

  ngOnInit() {
    this.getInvestors();
  }

  getInvestors() {
    this.investor.getInvestors()
      .subscribe((investors) => {
        this.investors = investors;
        console.log(this.investors);
      });
  }

}
