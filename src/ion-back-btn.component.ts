import { Component, ViewChild, ElementRef, ViewContainerRef } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'ion-back-btn',
  styles: [
    `:host {
      float: left;
      margin-left: -10px;
    }`,
    `:host button {
      color: #fff;
      font-size: 2rem;
      font-weight: bold;
      border-radius: 100%;
      background-color: transparent;
      position: relative;
      overflow: hidden;
    }`
  ],
  template: `
    <button ripple containerClass="header" size="1.25"
      fillTransition="700ms cubic-bezier(0.4, 0.0, 1, 1)"
      releaseTransition="70ms cubic-bezier(0.4, 0.0, 0.2, 1)"
      (_tap)="back()"
      (_pressup)="back()"
    >
      <ion-icon name="md-arrow-back"></ion-icon>
      <ng-container #rippleVc></ng-container>
    </button>
  `
})
export class IonBackBtnComponent {

  elRef:ElementRef

  nav: any

  @ViewChild("rippleVc", {read: ViewContainerRef}) rippleVc: ViewContainerRef;

  constructor( _nav: NavController , _elRef: ElementRef){ 
    this.elRef = _elRef
    this.nav = _nav
  }

  back() {
    this.nav.pop();
  }
}