import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DashService } from '../dash.service';
import { FileUploader } from "ng2-file-upload";
import { SessionService } from '../session.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  newReport = {
    reportDate: "",
    reportName: "",
    userid: this.route.params['_value'].id
  }

  uploader: FileUploader = new FileUploader({
    url: `http://localhost:3000/api/dashboard/report/${this.newReport.userid}`,
    authToken: `JWT ${this.session.token}`
  });

  successMessage = false;
  report: Object = {};
  reportInvestor: Object = {};
  feedback: string;
  constructor(private investor: DashService,
              private route: ActivatedRoute,
              private session: SessionService
            ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getInvestorDetails(params['id']);
    });
    this.uploader.onSuccessItem = (item, response) => {
      this.feedback = JSON.parse(response).message;
    };

    this.uploader.onErrorItem = (item, response, status, headers) => {
      this.feedback = JSON.parse(response).message;
    };
  }



   getInvestorDetails(id) {
    console.log(id);
    this.investor.get(id)
      .subscribe((investor) => {
        this.reportInvestor = investor;
      });
      
  }

  addReport() {
    this.uploader.onBuildItemForm = (item, form) => {
      form.append('reportDate', this.newReport.reportDate);
      form.append('reportName', this.newReport.reportName);
      form.append('userid', this.newReport.userid);
    };

    this.uploader.uploadAll();
    this.successMessage = true;
  }

}
