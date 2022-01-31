import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/internal/Observable';
import {take} from 'rxjs/operators';
import {map} from 'rxjs/operators';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!this.authService.isAuthenticated() || !this.authService.isSuperAgent()) {
      this.router.navigate(['login']);
      return false;
    }
    console.log("lalaelse");
    return true;
  }
}
