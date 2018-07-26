import { Component, Input, ElementRef, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'ion-nav-bar',
  styles: [
    `:host ion-navbar {
      padding: 0px;
    }`
  ],
  template: `
    <ion-navbar color="{{bgColor}}" [hideBackButton]="true">
      <ng-content></ng-content>
    </ion-navbar>
    <ng-container #tooltipVc></ng-container>
  `
})
export class IonNavBarComponent {
  @Input('title') pageTitle: string;
  @Input('color') bgColor: string;

  @ViewChild("tooltipVc", {read: ViewContainerRef}) tooltipVc: ViewContainerRef;

  constructor(el: ElementRef){
    el.nativeElement.style.display = 'block';
  }
}