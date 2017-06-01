import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { HomeNavbarComponent } from './home-navbar/home-navbar.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InvestorComponent } from './investor/investor.component';
import { ReportComponent } from './report/report.component';
import { InvestorDetailComponent } from './investor-detail/investor-detail.component';
import { SessionService } from './session.service';
import { InvestmentComponent } from './investment/investment.component';
import { FundComponent } from './fund/fund.component';
import { ReportsComponent } from './reports/reports.component';
import { DashboardInvestorComponent } from './dashboard-investor/dashboard-investor.component';
import { FundEditComponent } from './fund-edit/fund-edit.component';
import { PeopleComponent } from './people/people.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'our-people', component: PeopleComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'dashboard-investor/:id', component: DashboardInvestorComponent },
    { path: 'investors', component: InvestorComponent },
    { path: 'investor-detail/:id', component: InvestorDetailComponent, canActivate: [SessionService]  },
    { path: 'investment/:id', component: InvestmentComponent, canActivate: [SessionService]  },
    { path: 'funds', component: FundComponent, canActivate: [SessionService]  },
    { path: 'funds/:id', component: FundEditComponent, canActivate: [SessionService]  },
    { path: 'report/:id', component: ReportComponent, canActivate: [SessionService]  },
    
];