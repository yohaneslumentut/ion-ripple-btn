import { Component } from '@angular/core';
import { RippleButtonComponent } from './ripple-button.component';

@Component({
  selector: 'ion-toolbar-btn',
  styles: [
    `:host {
      float: right;
      margin-right: -12px;
      margin-left: -12px;
    }`,
    `:host button {
      color: #fff;
      font-size: 2rem;
      font-weight: bold;
      border-radius: 100%;
      background-color: transparent;
      width: 70px;
      height: 70px;
      margin-top: -7px;
      margin-bottom: -7px;
    }`
  ],
  template: `
    <button ripple tooltip-navbar
      rippleBgColor="{{ getRippleBgColor() }}"
      activeBgColor="{{ getActiveBgColor() }}"
      tapLimit="{{ getTapLimit() }}"
      tooltipText="{{ getTooltipText() }}"
      ttClass="{{ getCssClass() }}"
      ttPosition="bottomLeft"
      (_tap)="onTap($event)"
      (_press)="onPress($event)"
      (_pressup)="onPressup($event)"
    >
      <ng-content></ng-content>
      <ng-container #rippleVc></ng-container>
    </button>
  `
})
export class IonToolbarBtnComponent extends RippleButtonComponent {}