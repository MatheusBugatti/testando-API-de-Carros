import { TestBed } from '@angular/core/testing';

import { DynamicviewService } from './dynamicview.service';

describe('DynamicviewService', () => {
  let service: DynamicviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamicviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
