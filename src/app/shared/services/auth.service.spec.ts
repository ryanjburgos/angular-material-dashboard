import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { CookieModule } from 'ngx-cookie';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, CookieModule.withOptions()],
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
