import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanMatch,
  RouterStateSnapshot,
  Route,
  UrlSegment,
  Router,
} from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class PublicGuard implements CanActivate, CanMatch {
  constructor(private authService: AuthService, private router: Router) {}
  private catchAuthStatus(): boolean | Observable<boolean> {
    return this.authService.checkAuthentication().pipe(
      tap((isAuthenticated) => {
        if (isAuthenticated) this.router.navigate(['/heroes/list']);
      }),
      map((isAuth) => !isAuth)
    );
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> {
    return this.catchAuthStatus();
  }
  canMatch(
    route: Route,
    segments: UrlSegment[]
  ): boolean | Observable<boolean> {
    return this.catchAuthStatus();
  }
}
