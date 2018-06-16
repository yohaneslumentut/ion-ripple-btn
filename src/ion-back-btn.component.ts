import { Component, Input,  } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'ion-back-btn',
  styles: [
    `:host .ion-back-btn-wrapper {
      float: left;
      margin-left: -10px;
    }`,
    `:host .ion-back-btn-wrapper .ease-out { transition: background-color 0.4s ease-out; }`,
    `:host .ion-back-btn-wrapper button {
      position: relative;
      color: #fff;
      font-size: 2rem;
      font-weight: bold;
      border-radius: 100%;
      background-color: transparent;
    }`
  ],
  template: `
    <div class="ion-back-btn-wrapper">
      <button ripple-btn
        size="1.35"
        interval="400"
        containerClass="header"
        wrapperClass="ion-back-btn-wrapper"
        (btnTapped)="back()"
        (btnPressup)="back()"
      >
        <ion-icon name="md-arrow-back"></ion-icon>
      </button>
    </div>
  `
})
export class IonBackBtnComponent {

  nav: any

  @Input('interval') interval: number;

  constructor( nav: NavController){ this.nav = nav }

  back() {
    this.nav.pop();
  }
}