import { Injectable } from '@angular/core';
import { CanActivate, Router, CanActivateChild } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  canActivate(): boolean {
    return this.checkAuth();
  }

  canActivateChild(): boolean {
    return this.checkAuth();
  }

  private checkAuth(): boolean {
    if (typeof window === 'undefined') return false;

    const token = localStorage.getItem('token');
    if (token) {
      const decoded: any = jwtDecode(token);
      const exp = decoded.exp * 1000;
      if (Date.now() < exp) return true;
    }

    this.router.navigate(['/login']);
    return false;
  }



}