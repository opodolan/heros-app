import { HttpNotificationInterceptor } from './http-notification-interceptor.interceptor';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TestBed } from '@angular/core/testing';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/app.module';

describe('Logger Interceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let notificationInterceptor: HttpNotificationInterceptor;
  let spy: Function;
  const mockSnackbarMock = jasmine.createSpyObj(['open']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient],
          },
        }),],
      providers: [
        {provide: MatSnackBar, useValue: mockSnackbarMock},
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpNotificationInterceptor,
          multi: true,
        }
      ],
    });

    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    notificationInterceptor = TestBed.inject(HttpNotificationInterceptor);
    spy = spyOn(notificationInterceptor, 'intercept');
  });

  it('should NotificationInterceptor been called', () => {
    httpClient.get('/heros')
      .subscribe();

    const req: TestRequest = httpMock.expectOne('/heros');
    expect(spy).not.toHaveBeenCalled();

    req.flush({});
  })
});
