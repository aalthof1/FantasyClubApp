import { TestBed } from '@angular/core/testing';

import { CurrentCharService } from './current-char.service';

describe('CurrentCharService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CurrentCharService = TestBed.get(CurrentCharService);
    expect(service).toBeTruthy();
  });

  it('should intitialize fields', () => {
    const service: CurrentCharService = TestBed.get(CurrentCharService);
    expect(service.characterSnap).toBeUndefined();
  });
});
