import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardInvestorComponent } from './dashboard-investor.component';

describe('DashboardInvestorComponent', () => {
  let component: DashboardInvestorComponent;
  let fixture: ComponentFixture<DashboardInvestorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardInvestorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardInvestorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
