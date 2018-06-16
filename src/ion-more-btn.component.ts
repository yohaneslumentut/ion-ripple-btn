import { Component, Input,  } from '@angular/core';
import { NavController, PopoverController } from 'ionic-angular';
import { IonMoreTooltipComponent } from './ion-more-tooltip.component';


@Component({
  selector: 'ion-more-btn',
  styles: [
    `:host .ion-more-btn-wrapper {
      float: right;
      margin-right: -10px;
    }`,
    `:host .ion-more-btn-wrapper .ease-out { transition: background-color 0.4s ease-out; }`,
    `:host .ion-more-btn-wrapper button {
      position: relative;
      color: #fff;
      font-size: 2rem;
      font-weight: bold;
      border-radius: 100%;
      background-color: transparent;
    }`
  ],
  template: `
    <div class="ion-more-btn-wrapper">
      <button ripple-btn
        size="1.35"
        interval="400"
        containerClass="header"
        wrapperClass="ion-more-btn-wrapper"
        (btnTapped)="showPopover()"
        (btnPressed)="showTooltip($event)"
      >
        <ion-icon name="md-more"></ion-icon>
      </button>
    </div>
  `
})
export class IonMoreBtnComponent {

  @Input('interval') interval: number;

  constructor( public nav: NavController, public popoverCtrl: PopoverController ){}

  showPopover() {
    // this.nav.pop();
  }

  showTooltip(event: any) {

    let popover = this.popoverCtrl.create(IonMoreTooltipComponent);

    let x = event.changedTouches[0].pageX;

    let evt = {
      target : {
        getBoundingClientRect : () => {
          return {
            top: 56,
            left: x
          };
        }
      }
    };

    popover.present({
      ev: evt
    });
  }
}