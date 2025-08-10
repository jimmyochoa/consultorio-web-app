import { TestBed } from '@angular/core/testing';

import { SpecialtyAreasService } from './specialty-areas.service';

describe('SpecialtyAreasService', () => {
  let service: SpecialtyAreasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpecialtyAreasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
