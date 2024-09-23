import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthApplication } from 'app/routes/auth/application/auth.application';
import { StorageApplication } from 'app/routes/auth/application/storage-application';
import { ITokens } from 'app/routes/auth/domain/token.interface';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError, mergeMap, retry, throwError } from 'rxjs';

@Injectable()
export class TokenTestInterceptor implements HttpInterceptor {
  constructor(
    private readonly storageApplication: StorageApplication,
    private readonly _injector: Injector,
    private toast: ToastrService,
    private translate: TranslateService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    //Obtengo el accesstoken
    const accessToken = this.storageApplication.getField('accessToken-test');

    // Clonar la petición y agregarle la autorización
    const clonedRequest = request.clone({
      headers: request.headers.append('authorization', 'Bearer' + accessToken),
    });

    // Le indico al interceptor que continue su camino hacia el backend
    return next.handle(clonedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';

        if (error.error instanceof ErrorEvent) {
          // Errores del lado del cliente
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // Errores del lado del servidor
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
          return this.handlerErrorBackend(error, request, next);
        }

        return throwError(() => new Error(errorMessage));
      })
    );
  }

  handlerErrorBackend(error: HttpErrorResponse, request: HttpRequest<unknown>, next: HttpHandler) {
    const auth = this._injector.get(AuthApplication); // Está es otra forma de obtener el servicio de autenticación

    if (error.status === 409) {
      const refreshToken = this.storageApplication.getField('refreshToken-test');

      return auth.getNewAccessToken(refreshToken!).pipe(
        retry(3), // Intenta nuevamente 3 veces por si cae la red
        mergeMap((tokens: ITokens) => {
          // Si todo sale bien, actualizo los tokens
          this.storageApplication.setField('accessToken-test', tokens.accessToken); // Actualizo el access-token
          this.storageApplication.setField('refreshToken-test', tokens.refreshToken); // Actualizo el refresh-token

          const clonedRequest = request.clone({
            // Clonar la petición y agregarle la nueva autorización
            headers: request.headers.append('authorization', 'Bearer' + tokens.accessToken),
          });

          return next.handle(clonedRequest);
        })
      );
    } else if (error.status === 401) {
      auth.logout();
      return throwError(() => new Error('Error: 401 Unauthorized'));
    } else {
      this.toast.error(this.translate.instant('status_messages.error'));
      return throwError(() => new Error('Error: ' + error.message));
    }
  }
}
