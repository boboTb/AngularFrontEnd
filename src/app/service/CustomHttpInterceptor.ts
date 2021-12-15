import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { HttpEvent } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
//import 'rxjs/add/observable/fromPromise';
import { from } from 'rxjs';
 
@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>,next: HttpHandler): Observable<HttpEvent<any>> 
  {
    if(request.url.includes("token")) //ako je ova metoda za dobijanje tokena, da pusti zahtjev bez da u njega stavlja token
    {
      return next.handle(request);
    }
    let token: string = "";
    token = localStorage.getItem('token') as string;
    if(token != "")
    {
      const TOKEN_HEADER_KEY = 'Authorization';
      let authReq = request;
      authReq = request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
      return next.handle(authReq);
    }
    else
    {
      return next.handle(request);
    }

  }
}

/*export const AuthInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: CustomHttpInterceptor,
  multi: true,
};*/
