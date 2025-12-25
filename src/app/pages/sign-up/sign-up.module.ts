import { MaskitoModule } from '@maskito/angular';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignUpPageRoutingModule } from './sign-up-routing.module';

import { SignUpPage } from './sign-up.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SignUpPageRoutingModule,
    MaskitoModule
  ],
  declarations: [SignUpPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SignUpPageModule { }
