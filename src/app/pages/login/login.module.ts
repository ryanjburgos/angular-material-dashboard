import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ButtonModule } from '../../ui/button/button.module';
import { InputModule } from '../../ui/form-builder/input/input.module';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, LoginRoutingModule, MatCardModule, InputModule, FlexLayoutModule, ReactiveFormsModule, ButtonModule, MatSnackBarModule],
})
export class LoginModule {}
