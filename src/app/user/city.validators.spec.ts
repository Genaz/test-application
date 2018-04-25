import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UsersService } from '../users.service';
import { CityValidators } from './city.validators';



describe('CityValidators', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [UsersService, CityValidators]
    });
  });

  it('should be created', inject([CityValidators], (service: CityValidators) => {
    expect(service).toBeTruthy();
  }));
});