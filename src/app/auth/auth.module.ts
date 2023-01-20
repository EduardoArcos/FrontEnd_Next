import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthRoutingModule } from './auth-routing-module';
import { AuthService } from 'src/app/services/auth.service';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    AuthRoutingModule
  ],
  providers: [
    AuthService
  ]
})
export class AuthModule { }
