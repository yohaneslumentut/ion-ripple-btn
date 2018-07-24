import { Component, Input } from '@angular/core';
import { RippleButtonComponent } from './ripple-button.component';

@Component({
  selector: 'ion-title-btn',
  styles: [
    `:host {
      float: left;
      margin-left: -10px;
      overflow: hidden;
      text-overflow: ellipsis;
    }`,
    `:host button {
      background-color: transparent;
      width: 170px;
      margin-top: 0px;
      margin-bottom: 0px;
      padding-left: 10px;
      text-align: left;
    }`
  ],
  template: `
    <button ripple
      rippleBgColor="{{ getRippleBgColor() }}"
      activeBgColor="{{ getActiveBgColor() }}"
      tapLimit="{{ getTapLimit() }}"
      fillTransition="1000ms cubic-bezier(0.4, 0.0, 1, 1)"
      (_tap)="onTap($event)"
      (_press)="onPress($event)"
      (_pressup)="onPressup($event)"
    >
      <span class="page-title">{{ pageTitle }}</span><br>
      <span class="page-subtitle">{{ pageSubTitle }}</span>
      <ng-container #rippleVc></ng-container>
    </button>
  `
})
export class IonTitleBtnComponent extends RippleButtonComponent {

  @Input() pageTitle: string
  @Input() pageSubTitle: string

  ngAfterViewInit() {
    this.element = this.elRef.nativeElement.children[0];
    this.setClassName();
    this.setHeight();
  }

  setHeight() {
    const container: any = this.element.children[0].closest('.' + "header");
    this.element.style.height = container.offsetHeight + 'px';
  }

  getPageTitle() {
    return this.pageTitle || undefined
  }
}