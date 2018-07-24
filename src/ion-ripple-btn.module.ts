import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicModule } from 'ionic-angular';
import { IonNavBarComponent } from './ion-nav-bar.component';
import { RippleComponent } from './ripple.component';
import { RippleDirective } from './ripple.directive';
import { TooltipNavbarDirective } from './tooltip-navbar.directive';
import { TooltipHostComponent, TooltipComponent } from './tooltip.component';
import { IonBackBtnComponent } from './ion-back-btn.component';
import { IonRippleBtnComponent } from './ion-ripple-btn.component';
import { IonMoreBtnComponent } from './ion-more-btn.component';
import { IonToolbarBtnComponent } from './ion-toolbar-btn.component';
import { IonTitleBtnComponent } from './ion-title-btn.component';
import { RippleButtonComponent } from './ripple-button.component';

@NgModule({
  entryComponents: [
    IonNavBarComponent,
    TooltipHostComponent,
    TooltipComponent,
    RippleComponent,
    RippleButtonComponent,
    IonBackBtnComponent,
    IonRippleBtnComponent,
    IonMoreBtnComponent,
    IonToolbarBtnComponent,
    IonTitleBtnComponent
  ],
  declarations: [
    IonNavBarComponent,
    TooltipNavbarDirective,
    TooltipHostComponent,
    TooltipComponent,
    RippleDirective,
    RippleComponent,
    RippleButtonComponent,
    IonBackBtnComponent,
    IonRippleBtnComponent,
    IonMoreBtnComponent,
    IonToolbarBtnComponent,
    IonTitleBtnComponent
  ],
  providers: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule
  ],
  exports: [
    IonNavBarComponent,
    TooltipNavbarDirective,
    TooltipHostComponent,
    TooltipComponent,
    RippleDirective,
    RippleComponent,
    RippleButtonComponent,
    IonBackBtnComponent,
    IonRippleBtnComponent,
    IonMoreBtnComponent,
    IonToolbarBtnComponent,
    IonTitleBtnComponent
  ]
})
export class IonRippleBtnModule {}