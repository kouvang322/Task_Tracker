import { TestBed } from '@angular/core/testing';

import { NeonDbService } from './neon-db.service';

describe('NeonDbService', () => {
  let service: NeonDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NeonDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
