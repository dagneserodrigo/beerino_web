/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BeerinoService } from './beerino.service';

describe('BeerinoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BeerinoService]
    });
  });

  it('should ...', inject([BeerinoService], (service: BeerinoService) => {
    expect(service).toBeTruthy();
  }));
});
