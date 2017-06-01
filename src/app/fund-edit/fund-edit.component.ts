import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DashService } from '../dash.service';
import { PopoverModule } from 'ng2-popover';

@Component({
  selector: 'app-fund-edit',
  templateUrl: './fund-edit.component.html',
  styleUrls: ['./fund-edit.component.css']
})
export class FundEditComponent implements OnInit {
  successMessage = false;
  fund: Object = {};
  funds;
  constructor(
    private router: Router,
  	private route: ActivatedRoute,
    private dashService: DashService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getFundDetails(params['id']);
    });
  }

  getFunds() {
    this.dashService.getFunds()
      .subscribe((funds) => {
        this.funds = funds;
        console.log(this.funds);
      });
  }
  
  overcal() {
    alert('Open Date');
  }

  getFundDetails(id) {
    console.log(id);
    this.dashService.getFundDetail(id)
      .subscribe((fund) => {
        this.fund = fund;
      });
      
  }

  updateFund() {
    this.dashService.editFund(this.fund)
    .subscribe((fund) => {
      if (fund) {
        this.successMessage = true;
      }else {
        this.successMessage = false;
      }
    });
  }

}
