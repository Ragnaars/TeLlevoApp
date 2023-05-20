import { TestBed } from '@angular/core/testing';

import { FbCarreraService } from './fb-carrera.service';

describe('FbCarreraService', () => {
  let service: FbCarreraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FbCarreraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
