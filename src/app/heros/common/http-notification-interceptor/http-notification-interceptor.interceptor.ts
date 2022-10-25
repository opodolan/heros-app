import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse }
  from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Injectable({providedIn: 'root'})
export class HttpNotificationInterceptor implements HttpInterceptor {

  duration = 2000;

  constructor(private _snackBar: MatSnackBar,
    public translate: TranslateService) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      tap(evt => {
        if (evt instanceof HttpResponse) {
          this._snackBar.open(this.translate.instant("LOADING"), '', { duration: this.duration });
        }
      })
    );
  }
}
