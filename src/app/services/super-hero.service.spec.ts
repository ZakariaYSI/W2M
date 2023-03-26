import { getTestBed, TestBed } from '@angular/core/testing';
import {HttpErrorResponse} from '@angular/common/http'
import { SuperHeroService } from './super-hero.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('SuperHeroService', () => {
  let service: SuperHeroService;
  let injector: TestBed;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuperHeroService);
  });

  injector = getTestBed();
  service = injector.get(SuperHeroService);
  httpMock = injector.get(HttpTestingController);


  const dummyUserListResponse = {
    data: [
      { id: 1, Name: 'Batman', Power: 'world A class martial artist and detective ' },
      { id: 7, Name: 'Zoom', Power: 'Speed god from universe 2 ' },
      { id: 8, Name: 'Black Adam', Power: 'Anti hero ' },
    ],
  };

  it('getSuperHero() should return data', () => {
    service.getSuperHero().subscribe((res) => {
      expect(res).toEqual(dummyUserListResponse);
    });

    const req = httpMock.expectOne('http://localhost:3000/superHroesList/');
    expect(req.request.method).toBe('GET');
    req.flush(dummyUserListResponse);
  });

  it('should return an error when the server returns a 404', (done: DoneFn) => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404, statusText: 'Not Found'
    });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
})
