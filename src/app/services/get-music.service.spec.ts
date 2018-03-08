import { TestBed, inject } from '@angular/core/testing';

import { GetMusicService } from './get-music.service';

describe('GetMusicService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetMusicService]
    });
  });

  it('should be created', inject([GetMusicService], (service: GetMusicService) => {
    expect(service).toBeTruthy();
  }));
});
