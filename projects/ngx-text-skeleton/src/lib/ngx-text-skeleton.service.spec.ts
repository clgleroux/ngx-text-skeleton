import { TestBed } from '@angular/core/testing';

import { NgxTextSkeletonService } from './ngx-text-skeleton.service';

describe('NgxTextSkeletonService', () => {
  let service: NgxTextSkeletonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxTextSkeletonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
