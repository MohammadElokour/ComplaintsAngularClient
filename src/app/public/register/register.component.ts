import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { Request } from '../../interface/request'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public role:string = 'user';
  constructor(private authService: AuthService, private toast: ToastrService) { }

  ngOnInit(): void {}


  doRegister(form:NgForm) {
    this.authService.register(form.value).subscribe((res:Request)=> {
      if(res.status === 401) {
        this.toast.error(res.message)
      } else {
        this.toast.success(res.message)
      }
    })
  }

}
