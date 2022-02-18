import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private service: ApiService, private router:Router) { }
   
  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean|UrlTree {
      const token = window.localStorage.getItem('auth');
if (!token) {
this.router.navigate(["/login"]);
return false;
} 

return true;
}
}
