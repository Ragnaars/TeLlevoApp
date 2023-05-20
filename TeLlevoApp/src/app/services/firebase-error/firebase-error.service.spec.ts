import { TestBed } from '@angular/core/testing';

import { FirebaseErrorService } from './firebase-error.service';

describe('FirebaseErrorService', () => {
  let service: FirebaseErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseErrorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
