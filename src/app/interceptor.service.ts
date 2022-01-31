import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { UserServiceService } from './user-service.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{
  token: string | null | undefined;

  constructor(private authService: AuthService, private userService: UserServiceService , private router: Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    this.token = localStorage.getItem("authorization");
    console.log(this.token);
    if (this.token) {
      const tokenizedReq = req.clone({ headers: req.headers.set('Authorization', this.token) });
      return next.handle(tokenizedReq).pipe(catchError((err: HttpErrorResponse) => {
        if (err instanceof HttpErrorResponse) {
          console.log("status" + err.status);
          console.log(err.statusText);
          if (err.status === 403) {
        
             this.authService.logOut();
             this.router.navigate(['/login']);
          }
      }
      return throwError(err);
      })as any)
    }
    return next.handle(req)
  }

}