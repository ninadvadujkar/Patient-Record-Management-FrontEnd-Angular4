import { TestBed, inject } from '@angular/core/testing';

import { PatientServiceService } from './patient-service.service';

describe('PatientServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PatientServiceService]
    });
  });

  it('should be created', inject([PatientServiceService], (service: PatientServiceService) => {
    expect(service).toBeTruthy();
  }));
});
