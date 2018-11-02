import { TestBed } from '@angular/core/testing';

import { PassGameService } from './pass-game.service';

describe('PassGameService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PassGameService = TestBed.get(PassGameService);
    expect(service).toBeTruthy();
  });

  it('should initialize fields', () => {
    const service: PassGameService = TestBed.get(PassGameService);
    expect(service.gameSnap).toBeUndefined();
  });
});
