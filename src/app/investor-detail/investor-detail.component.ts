import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DashService } from '../dash.service';
import { AlertModule } from 'ngx-bootstrap/alert';

@Component({
  selector: 'app-investor-detail',
  templateUrl: './investor-detail.component.html',
  styleUrls: ['./investor-detail.component.css']
})
export class InvestorDetailComponent implements OnInit {
  successMessage = false;
  investor: Object = {};
  constructor(
  	private router: Router,
  	private route: ActivatedRoute,
    private dashService: DashService
  ) {}

  ngOnInit() {
  	this.route.params.subscribe(params => {
      this.getInvestorDetails(params['id']);
    });
  }

  getInvestorDetails(id) {
    console.log(id);
    this.dashService.get(id)
      .subscribe((investor) => {
        this.investor = investor;
      });
      
  }
  

  updateInvestor() {
    
    this.dashService.edit(this.investor)
    .subscribe((investor) => {
      if (investor) {
        this.successMessage = true;
      }else {
        this.successMessage = false;
      }
    });
  }

  deleteInvestor(id) {
      if (window.confirm('Are you sure? All reports and information will be lost!')) {
        this.dashService.remove(id)
        .subscribe(() => {
          this.router.navigate(['/investors']);
        });
      }
  }
}
