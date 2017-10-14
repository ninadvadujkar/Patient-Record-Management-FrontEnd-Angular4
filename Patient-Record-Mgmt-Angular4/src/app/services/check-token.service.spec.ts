import { TestBed, inject } from '@angular/core/testing';

import { CheckTokenService } from './check-token.service';

describe('CheckTokenService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CheckTokenService]
    });
  });

  it('should be created', inject([CheckTokenService], (service: CheckTokenService) => {
    expect(service).toBeTruthy();
  }));
});
