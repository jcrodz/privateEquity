import { Component, OnInit } from '@angular/core';
import { DashService } from '../dash.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpModule } from '@angular/http';

@Component({
  selector: 'app-dashboard-investor',
  templateUrl: './dashboard-investor.component.html',
  styleUrls: ['./dashboard-investor.component.css']
})
export class DashboardInvestorComponent implements OnInit {

  reports;
  investor: Object = {};
  constructor(
    private dash: DashService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getReports(params['id']);
    });
  }

  getReports(id) {
    this.dash.getReports(id)
      .subscribe((investor) => {
        this.investor = investor;
        this.reports = investor.reports;
        console.log(this.investor);
        console.log(this.reports);
      });
  }

}


