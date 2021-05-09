import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { AuthService } from '../service/auth.service';
import { Request } from '../interface/request';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService:AuthService, private router: Router) {}
  canActivate():boolean {
    this.authService.getComplaints().subscribe((res:Request)=> {
      if(res.status === 200) {
        return true;
      }
      this.router.navigate(['auth/login']);
      return false;
    })
    return true;
  }

}
