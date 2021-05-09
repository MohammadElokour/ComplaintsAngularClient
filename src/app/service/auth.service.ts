import { Injectable } from '@angular/core';
import { Router } from '@angular/router'
import { Request } from '../interface/request'
import { apiUrl } from '../../environments/environment.prod'
import { tap, catchError } from 'rxjs/operators'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { observable, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) {}

  setTokenToLocalStorage(request: Request) {
    return request.hasOwnProperty('token') &&
    localStorage.setItem('Token', request.token)
  }


  //login Api

  login(data) {
    return this.http.post<Request>(apiUrl+'login', data).pipe(
      tap((res)=> {
        this.setTokenToLocalStorage(res);
        this.router.navigate(['/complaints']);
      }),

      catchError((err)=> {
        const {error} = err;

        return new Observable((res)=> {
          let reqData = {}
          if (err.status === 401) {
            reqData = {
              message: error.message,
              status: error.status,
              token: error.token
            }
          } else {
            reqData = {
              message: error.statusText,
              status: error.status,
              token: ""
            }
          }
          res.next(reqData);
        });
      })
    );
  }

  logout() {
    localStorage.removeItem('Token');
    this.router.navigate(['/auth/login']);
  }

  //Register Api
  register(data) {
    return this.http.post<Request>(apiUrl+'register', data).pipe(
      tap((res)=> {
        this.setTokenToLocalStorage(res);
        this.router.navigate(['/complaints']);
      }),

      catchError((err)=> {
        const {error} = err;

        return new Observable((res)=> {
          let reqData = {}
          if (err.status === 401) {
            reqData = {
              message: error.message,
              status: error.status,
              token: error.token
            }
          } else {
            reqData = {
              message: error.statusText,
              status: error.status,
              token: ""
            }
          }
          res.next(reqData);
        });
      })
    );
  }

  //get compliants page

  getComplaints() {
    const token = localStorage.getItem('Token');
    return this.http.get(apiUrl+'complaints', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    }).pipe(
      catchError((error) => {
        return new Observable((res)=> {
          const reqData = {
            message: error.statusText,
            status: error.status,
          }

          res.next(reqData);
        })
      })
    )

  }



}
