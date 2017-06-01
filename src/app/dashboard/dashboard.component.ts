import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DashService } from './../dash.service';
import { ChartsModule } from 'ng2-charts';
import { SessionService } from '../session.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
        yAxes: [{id: 'y-axis-1', type: 'linear', position: 'left', ticks: {min: 0}}]
        }
  };
  public barChartLabels:string[] = [];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
  fundLabels:string[] = [];
  fundRaisedData:string[] = [];
  fundTargetData:string[] = [];
 
  public barChartData:any[] = [
    {data: [], label: 'Raised Amount'},
    {data: [], label: 'Target Amount'}
  ];
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
  
  user;
  funds:any;
  constructor(
  	private router: Router,
  	private route: ActivatedRoute,
    private userAut: DashService,
    private session: SessionService,
  ) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.user);
    console.log(this.user);
    this.getFundsFunds();
    
    console.log('this funds', this.funds);
  }

  getFundsFunds() {
    this.userAut.getFundsFunds()
      .subscribe((funds) => {
        this.funds = funds;
        console.log(this.funds);
        console.log('in angular 2 all funds', this.funds);
        console.log('in angular 2 all funds', this.funds[0].fund['fundName']);
        for (let entry of this.funds) {
          this.fundLabels.push(entry.fund['fundName']);
          this.fundTargetData.push(entry.fund['totalInvestment']);
          console.log(entry.raisedAmount);
          this.fundRaisedData.push(entry.raisedAmount);
        }
        this.barChartLabels = this.fundLabels;
        this.barChartData[0]['data'] = this.fundRaisedData;
        this.barChartData[1]['data'] = this.fundTargetData;
        console.log(this.barChartData);
        console.log(this.barChartLabels);
      });
  }
};
