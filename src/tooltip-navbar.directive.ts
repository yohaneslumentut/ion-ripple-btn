import { Directive, ElementRef, Input, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { IonNavBarComponent } from './ion-nav-bar.component';
import { TooltipComponent } from './tooltip.component';

@Directive({
  selector: '[tooltip-navbar]',
  host: {
    '(_press)': 'showTooltip($event)'
  }
})
export class TooltipNavbarDirective {

  el: HTMLElement
  tooltipElement: any
  tooltipFadeTimeout: any
  tooltipDestroyTimeout: any
  tooltipRemovalTimeout: any

  @Input() tooltipText: string
  @Input() ttPosition: string
  @Input() ttClass: string

  constructor(
    el: ElementRef,
    private navBar: IonNavBarComponent,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    this.el = el.nativeElement
  }

  createTooltipElement() {
    const viewPort:ViewContainerRef = this.navBar.tooltipVc,
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
      tt.rect = this.el.getBoundingClientRect();
      tt.position = this.ttPosition;
      tt.atNavbar = true;
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
      }, 250);
    }, 500) 
  }

  resetTooltipTimer() {
    clearTimeout(this.tooltipFadeTimeout);
    clearTimeout(this.tooltipDestroyTimeout)
  }
}