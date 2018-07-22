import { Component, ElementRef, ViewContainerRef, Renderer2, Input, HostBinding, ViewChild} from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Platform } from 'ionic-angular';

@Component({
  selector: 'tooltip-host',
  template: `<ng-container #tooltipVc></ng-container>`
})
export class TooltipHostComponent {

  elRef:ElementRef

  @ViewChild("tooltipVc", {read: ViewContainerRef}) tooltipVc: ViewContainerRef;

  constructor(_elRef: ElementRef) { this.elRef = _elRef }

}

@Component({
  selector: 'ion-tooltip',
  template: `{{ text }}`,
  animations: [
    trigger('fade', [
      state('visible', style({ opacity: 0.9})),
      state('invisible', style({ opacity: 0 })),
      transition('visible <=> invisible', animate('250ms'))
    ])
  ],
  styles: [
    `:host {
      white-space: nowrap;
      position: fixed;
      text-align: center;
      z-index: 999;
    }`
  ]
})
export class TooltipComponent {

  @HostBinding('@fade') fadeState: string = 'invisible'

  @Input() btn:any
  @Input() rect: any
  @Input() text: string
  @Input() position: string
  @Input() cssClass: string
  @Input() atNavbar: boolean = false

  getNativeElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  constructor(
    public elementRef: ElementRef, 
    private renderer: Renderer2,
    private platform: Platform
  ) {}

  ngAfterViewInit() {
    if(this.cssClass) {
      this.renderer.addClass(this.elementRef.nativeElement, this.cssClass);
    } else {
      this.setDefaultStyle();
    }
    this.setPosition()
  }

  setDefaultStyle() {
    this.setStyle('background-color', '#676A66');
    this.setStyle('color','white');
    this.setStyle('border-radius', '2px');
    this.setStyle('height', '30px');
    this.setStyle('font-size', '13px');
    this.setStyle('padding','8px 12px');
  }

  setPosition() {

    const btnTop = this.btn.offsetTop,
          btnLeft = this.btn.offsetLeft,
          rectWidth = this.rect.width,
          rectHeight = this.rect.height,
          tooltip = this.elementRef.nativeElement,
          tooltipWidth = tooltip.offsetWidth,
          tooltipHeight = tooltip.offsetHeight,
          centerH = btnLeft + (rectWidth/2) - (tooltipWidth/2),
          centerV = btnTop + (rectHeight/2) - (tooltipHeight/2),
          top = btnTop + tooltipHeight,
          bottom = btnTop + rectHeight,
          left = btnLeft - tooltipWidth,
          right = btnLeft + rectWidth,
          header = document.getElementsByClassName("header")[0],
          headerHeight = header ? header.getBoundingClientRect().height : 0,
          deviceWidth = this.platform.width();

    let position: string, posTop: number, posLeft: number;

    position = this.position || 'bottom'
    
    switch(position) {

      case 'top': {
        posTop = top
        posLeft = centerH
        break
      }

      case 'topLeft': {
        posTop = top
        posLeft = left + rectWidth/4
        break
      }

      case 'topRight': {
        posTop = top
        posLeft = right - rectWidth/4
        break
      }

      case 'bottom': {
        posTop = bottom
        posLeft = centerH
        break
      }

      case 'bottomLeft': {
        posTop = bottom
        posLeft = left + rectWidth/4
        break
      }

      case 'bottomRight': {
        posTop = bottom
        posLeft = right - rectWidth/4
        break
      }

      case 'left': {
        posTop = centerV
        posLeft = left
        break
      }

      case 'right': {
        posTop = centerV
        posLeft = right
        break
      }
    }

    posTop = this.atNavbar ? posTop : (posTop + headerHeight);
    this.setStyle( 'top', posTop + 'px');

    if(tooltipWidth + posLeft > deviceWidth) {
      this.setStyle('right', 10 + 'px');
    } else {
      this.setStyle('left', posLeft + 'px');
    }

  }

  setStyle(prop: string, val: any) {
    this.renderer.setStyle(this.getNativeElement(), prop , val);
  }
}