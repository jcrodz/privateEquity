import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { CollapseModule } from 'ngx-bootstrap';
import { AlertModule } from 'ngx-bootstrap/alert';
import { FileSelectDirective } from "ng2-file-upload";
import { ChartsModule } from 'ng2-charts';
import { PopoverModule } from 'ng2-popover';

import { RouterModule } from "@angular/router";
import { routes } from './app.routing';

import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { HomeNavbarComponent } from './home-navbar/home-navbar.component';

import { SessionService } from './session.service';
import { DashService } from './dash.service';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SideNavAdminComponent } from './side-nav-admin/side-nav-admin.component';
import { InvestorComponent } from './investor/investor.component';
import { ReportComponent } from './report/report.component';
import { InvestorDetailComponent } from './investor-detail/investor-detail.component';
import { InvestmentComponent } from './investment/investment.component';
import { FundComponent } from './fund/fund.component';
import { ReportsComponent } from './reports/reports.component';
import { DashboardInvestorComponent } from './dashboard-investor/dashboard-investor.component';
import { FundEditComponent } from './fund-edit/fund-edit.component';
import { PeopleComponent } from './people/people.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    HomeNavbarComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    SideNavAdminComponent,
    InvestorComponent,
    ReportComponent,
    InvestorDetailComponent,
    InvestmentComponent,
    FundComponent,
    ReportsComponent,
    FileSelectDirective,
    DashboardInvestorComponent,
    FundEditComponent,
    PeopleComponent
],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    CarouselModule.forRoot(),
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    CollapseModule.forRoot(),
    AlertModule.forRoot(),
    ChartsModule
  ],
  providers: [SessionService, DashService],
  bootstrap: [AppComponent]
})
export class AppModule { }
