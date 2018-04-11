/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PldserviceService } from './pldservice.service';

describe('Service: Pldservice', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PldserviceService]
    });
  });

  it('should ...', inject([PldserviceService], (service: PldserviceService) => {
    expect(service).toBeTruthy();
  }));
});