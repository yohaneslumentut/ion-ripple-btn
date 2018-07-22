import { Component, ViewContainerRef, ElementRef, ViewChild, Renderer2, ComponentFactoryResolver } from '@angular/core';
import { RippleButtonComponent } from './ripple-button.component';
import { TooltipComponent } from './tooltip.component';

@Component({
  selector: 'ion-ripple-btn',
  styles: [
    `:host button {
      position: relative;
      overflow: hidden;
    }`
  ],
  template: `
    <button ripple
      rippleBgColor="{{ getRippleBgColor() }}"
      activeBgColor="{{ getActiveBgColor() }}"
      tooltipText="{{ getTooltipText }}"
      tapLimit="{{ getTapLimit() }}"
      (_tap)="onTap($event)"
      (_press)="onPress($event)"
      (_pressup)="onPressup($event)"
    >
      <ng-content></ng-content>
      <ng-container #rippleVc></ng-container>
    </button>
    <ng-container #tooltipVc></ng-container>
  `
})
export class IonRippleBtnComponent extends RippleButtonComponent  {

  @ViewChild("tooltipVc", {read: ViewContainerRef}) tooltipVc: ViewContainerRef;

  constructor( 
    _elRef: ElementRef,
    _renderer2: Renderer2,
    _componentFactoryResolver: ComponentFactoryResolver
  ) {
    super(_elRef, _renderer2, _componentFactoryResolver);
  }

  onPress(event: any) {
    this.btnPress.emit(event)
    this.showTooltip(event)
  }

  createTooltipElement() {
    const viewPort:ViewContainerRef = this.tooltipVc,
          componentFactory = this.componentFactoryResolver.resolveComponentFactory(TooltipComponent);
    
    this.tooltipElement = viewPort.createComponent(componentFactory);
  }

  showTooltip(event: any) {

    if(this.tooltipElement){

      this.extendTimer();

    } else {

      this.createTooltipElement();

      const tt: TooltipComponent = this.tooltipElement.instance,
            target = event.target;

      tt.text = this.tooltipText;
      tt.fadeState = 'visible';
      tt.btn = target.tagName == 'BUTTON' ? target : target.closest('button');
      tt.rect = this.element.getBoundingClientRect();
      tt.position = this.ttPosition;
      tt.cssClass = this.ttClass;
      
      this.setTooltipRemovalTimeout();
    }
  }

  extendTimer() {
    this.resetTooltipTimer();
    this.setTooltipRemovalTimeout();
  }

  setTooltipRemovalTimeout() {
    clearTimeout(this.tooltipRemovalTimeout)
    this.tooltipRemovalTimeout = setTimeout(() => {
      this.removeTooltip()
    }, 650)
  }

  removeTooltip() {
    this.resetTooltipTimer();
    this.tooltipFadeTimeout = setTimeout(() => {
      this.tooltipElement.instance.fadeState = 'invisible';
      this.tooltipDestroyTimeout = setTimeout(() => { 
        this.tooltipElement.destroy();
        this.tooltipElement = undefined
      }, 150);
    }, 500) 
  }

  resetTooltipTimer() {
    clearTimeout(this.tooltipFadeTimeout);
    clearTimeout(this.tooltipDestroyTimeout)
  }
}