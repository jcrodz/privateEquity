import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions} from '@angular/http';
import { SessionService } from './session.service'
import 'rxjs/add/operator/map';

@Injectable()
export class DashService {
  BASE_URL: string = 'http://localhost:3000/api';
  
  constructor(
    private http: Http,
    private SessionService: SessionService
  ) {
    
  }
    
 
   getInvestors() {
    let headers = new Headers({ 'Authorization': 'JWT ' + this.SessionService.token });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(`${this.BASE_URL}/dashboard`, options)
      .map((res) => res.json());
  }

  getFunds() {
    let headers = new Headers({ 'Authorization': 'JWT ' + this.SessionService.token });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(`${this.BASE_URL}/dashboard/fund`, options)
      .map((res) => res.json());
  }

  getFundsFunds() {
    let headers = new Headers({ 'Authorization': 'JWT ' + this.SessionService.token });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(`${this.BASE_URL}/dashboard/fund/fund`, options)
      .map((res) => res.json());
  }

  getFundDetail(id) {
    let headers = new Headers({ 'Authorization': 'JWT ' + this.SessionService.token });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(`${this.BASE_URL}/dashboard/fund/${id}`, options)
      .map((res) => res.json());
  }
  
  get(id) {
    let headers = new Headers({ 'Authorization': 'JWT ' + this.SessionService.token });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(`${this.BASE_URL}/dashboard/${id}`, options)
      .map((res) => res.json());
  }

  getReports(id) {
    let headers = new Headers({ 'Authorization': 'JWT ' + this.SessionService.token });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(`${this.BASE_URL}/dashboard/report/${id}`, options)
      .map((res) => res.json());
  }
  
  edit(investor) {
      console.log('inside edit', investor._id);
    let headers = new Headers({ 'Authorization': 'JWT ' + this.SessionService.token });
    let options = new RequestOptions({ headers: headers });
    return this.http.put(`${this.BASE_URL}/dashboard/${investor._id}`, investor, options )
      .map((res) => res.json());
  }

  editFund(fund) {
      console.log('inside edit', fund._id);
    let headers = new Headers({ 'Authorization': 'JWT ' + this.SessionService.token });
    let options = new RequestOptions({ headers: headers });
    return this.http.put(`${this.BASE_URL}/dashboard/fund/${fund._id}`, fund, options )
      .map((res) => res.json());
  }
  
  remove(id) {
    let headers = new Headers({ 'Authorization': 'JWT ' + this.SessionService.token });
    let options = new RequestOptions({ headers: headers });
    return this.http.delete(`${this.BASE_URL}/dashboard/${id}`, options)
      .map((res) => res.json());
  }

   addInvestment(investment, investor) {
    let headers = new Headers({ 'Authorization': 'JWT ' + this.SessionService.token });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(`${this.BASE_URL}/dashboard/investment/${investor._id}`, investment, options)
      .map((res) => res.json());
  }

  addFund(fund) {
      console.log('inside add fund', fund);
    let headers = new Headers({ 'Authorization': 'JWT ' + this.SessionService.token });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(`${this.BASE_URL}/dashboard/fund`, fund, options)
      .map((res) => res.json());
  }

}