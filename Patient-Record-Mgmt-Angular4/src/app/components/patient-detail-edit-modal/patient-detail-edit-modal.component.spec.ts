import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientDetailEditModalComponent } from './patient-detail-edit-modal.component';

describe('PatientDetailEditModalComponent', () => {
  let component: PatientDetailEditModalComponent;
  let fixture: ComponentFixture<PatientDetailEditModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientDetailEditModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientDetailEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
