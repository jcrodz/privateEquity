import { Component, OnInit } from '@angular/core';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-side-nav-admin',
  templateUrl: './side-nav-admin.component.html',
  styleUrls: ['./side-nav-admin.component.css']
})
export class SideNavAdminComponent implements OnInit {
  user: boolean = true;
  constructor(private session: SessionService) { }

  ngOnInit() {
    console.log('in side nav bar', JSON.parse(localStorage.user).role);
    this.user = (JSON.parse(localStorage.user).role === 'ADMIN') ? true : false;
  }

}
