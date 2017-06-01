import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-navbar',
  templateUrl: './home-navbar.component.html',
  styleUrls: ['./home-navbar.component.css']
})
export class HomeNavbarComponent implements OnInit {
  userstatus: boolean = true;
  user;
  isCollapsed: boolean = false;

  constructor(
  	private session: SessionService,
  	private router:  Router
  ) {router.events.subscribe(() => this.routeChanged());}

  ngOnInit() {
    this.userstatus = (JSON.parse(localStorage.user).role === 'ADMIN') ? true : false;
    console.log(this.session.token);
  }

  private routeChanged():void {
    var path = window.location;
    console.log("Path:" + path);
  }

  logout() {
  	this.session.logout();
    this.user = null;
  	// this.router.navigate(['/login']);
  }
}
