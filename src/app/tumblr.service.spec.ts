import { TestBed, inject } from '@angular/core/testing';

import { TumblrService } from './tumblr.service';

describe('TumblrService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TumblrService]
    });
  });

  it('should be created', inject([TumblrService], (service: TumblrService) => {
    expect(service).toBeTruthy();
  }));
});
