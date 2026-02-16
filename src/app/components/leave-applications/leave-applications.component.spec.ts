import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveApplicationsComponent } from './leave-applications.component';

describe('LeaveApplicationsComponent', () => {
  let component: LeaveApplicationsComponent;
  let fixture: ComponentFixture<LeaveApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveApplicationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
