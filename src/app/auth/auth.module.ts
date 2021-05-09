import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { ComplaintsComponent } from './complaints/complaints.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ComplaintsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
