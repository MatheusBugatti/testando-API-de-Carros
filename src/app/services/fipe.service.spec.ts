import { TestBed } from '@angular/core/testing';

import { MarcasService } from './fipe.service';

describe('MarcasService', () => {
  let service: MarcasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarcasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
