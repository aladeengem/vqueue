import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginRouter } from './login-routing';
import { CoreModule } from '../../core/core.module';
import { ClarityModule } from '@clr/angular';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    CoreModule,
    ClarityModule,
    LoginRouter,
    FormsModule 
    
  ],
  exports: [LoginComponent]
})
export class LoginModule { }
