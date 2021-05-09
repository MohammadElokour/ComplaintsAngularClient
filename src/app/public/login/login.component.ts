import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { Request } from '../../interface/request'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private toast: ToastrService,
  ) { }

  ngOnInit(): void {
  }

  doLogin(form:NgForm) {
    this.authService.login(form.value).subscribe((res:Request) => {
      if(res.status === 401) {
        this.toast.error(res.message);
      } else {
        this.toast.success(res.message);
      }
    })
  }

}
