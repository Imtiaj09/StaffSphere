import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    // Check if the user is logged in
    if (localStorage.getItem('currentUser')) {
      // User is logged in, so return true
      return true;
    }

    // User is not logged in, so redirect to login page
    this.router.navigate(['/login']);
    return false;
  }
}
