import { Directive, ElementRef, Input, Output, Renderer, Renderer2, EventEmitter, HostBinding, ComponentFactoryResolver, ViewContainerRef, ComponentRef } from '@angular/core';
import { style, animate, AnimationBuilder } from '@angular/animations';
import { RippleComponent } from './ripple.component';

@Directive({
  selector: '[ripple]',
  host: {
    '(touchstart)': 'onTouchstart($event)',
    '(touchmove)': 'onTouchmove($event)',
    '(touchend)': 'onTouchend($event)'
  }
})
export class RippleDirective {

  el: HTMLElement
  hostElement: HTMLElement
  rippleElement: ComponentRef<RippleComponent>
  hostComponent: any
  container: any
  event: any
  style: any
  ripple: any
  tooltip: any

  isActive: boolean =  false
  isDragging: boolean = false

  hostBackground: string
  elementActiveBackground: string = undefined
  elementInactiveBackground: string = undefined
  elementAnimation: any
  rippleBackground: string

  containerHeight: number

  touchstartTimeStamp: number = 0
  touchendTimeStamp: number = 0
  pressTimeout: any = null
  tooltipDestroyTimeout: any
  tooltipFadeTimeout: any

  _fillTransition: string
  fillTransitionDuration: number
  _releaseTransition: string
  releaseTransitionDuration: number

  @HostBinding('style.height') height: string
  @HostBinding('style.width') width: string
  @HostBinding('style.backgroundColor') backgroundColor: string
  @HostBinding('style.marginTop') marginTop: string
  @HostBinding('style.position') position: string = 'relative';
  @HostBinding('style.overflow') overflow: string = 'hidden';

  @Input() tapLimit: number
  @Input() size: number
  @Input() containerClass: string
  @Input() rippleBgColor: string
  @Input() activeBgColor: string
  @Input() tooltipText: string
  @Input() fillTransition: string
  @Input() releaseTransition: string
  @Input() cssClass: string

  @Output() _tap: EventEmitter<any> = new EventEmitter();
  @Output() _press: EventEmitter<any> = new EventEmitter();
  @Output() _pressup: EventEmitter<any> = new EventEmitter();

  constructor(
    el: ElementRef,
    private renderer: Renderer,
    private renderer2: Renderer2,
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef,
    private builder: AnimationBuilder
  ) {
    this.el = el.nativeElement;
    this.hostComponent = (<any>viewContainerRef)["_view"].component;
    this.hostElement = this.hostComponent.elRef.nativeElement;
  }

  delay:any = (ms:number) => new Promise(_ => setTimeout(_, ms))

  ngAfterViewInit() {
    this.getStyle();
    this.setDimensions();
    this.setRippleBgColor();
    this.setTransition();
  }

  getStyle() { this.style = getComputedStyle(this.el) }

  setClassName() { if(this.cssClass)this.renderer2.addClass(this.el, this.cssClass) }

  setDimensions(){
    let height, width;
    if(this.containerClass){
      this.container = this.el.children[0].closest('.' + this.containerClass);
      this.containerHeight = this.container.offsetHeight;
      this.width = this.height = (this.containerHeight * this.size) + 'px';
      this.marginTop =  (this.containerHeight * (1 - this.size)) / 2 + 'px';
      height = this.containerHeight; width = this.width;
    } else {
      height = this.style.height; width = this.style.width;
    }

    this.renderer.setElementStyle(this.hostElement, 'height', height + 'px');
    this.renderer.setElementStyle(this.hostElement, 'width', width + 'px');
  }

  getHostBgColor() {
    if(!this.elementActiveBackground) {
      this.elementActiveBackground = this.activeBgColor || 'rgba(255,255,255,0.10)';
      this.elementInactiveBackground = this.style.backgroundColor;
    }
  }

  setRippleBgColor() {
    this.rippleBackground = this.rippleBgColor || 'rgba(255,255,255, 0.15)';
  }

  setTransition() {
    this._fillTransition = this.fillTransition || '900ms'
    this.fillTransitionDuration = parseInt(this._fillTransition.substring(0, this._fillTransition.indexOf('ms')))
    this._releaseTransition = this.releaseTransition || '90ms cubic-bezier(0.4, 0.0, 0.2, 1)'
    this.releaseTransitionDuration = parseInt(this._releaseTransition.substring(0, this._releaseTransition.indexOf('ms')))
  }

  playHostActiveAnimation() { 
    if(!this.elementActiveBackground) this.getHostBgColor();
    const animation = this.builder.build([ animate('210ms',style({ background: this.elementActiveBackground })) ]);
    this.elementAnimation = animation.create( this.el );
    this.elementAnimation.play();
  }

  playHostInactiveAnimation() {
    const animation = this.builder.build([ animate('500ms',style({ background: this.elementInactiveBackground })) ]);
    this.elementAnimation = animation.create( this.el );
    this.elementAnimation.play();
  }

  activate() { 
    this.isActive = true;
    if(this.hostComponent.state){
      this.hostComponent.state = 'active';
    } else if(this.cssClass){
      this.renderer2.addClass(this.el, 'active');
    } else {
      this.playHostActiveAnimation();
    }
  }

  deactivate() {
    this.isActive = false;
    if(this.hostComponent.state){
      this.hostComponent.state = 'inactive';
    } else if(this.cssClass){
      this.renderer2.removeClass(this.el, 'active');
    } else {
      this.playHostInactiveAnimation();
    }
  }

  deactivateAndRemoveRipple(){
    this.deactivate();
    if(this.ripple) {
      this.ripple.animation.destroy();
      this.rippleElement.destroy();
      this.ripple = undefined;
    }
  }

  onTouchstart(event: any) {
    this.event = event;
    this.touchstartTimeStamp = event.timeStamp;
    if(!this.isActive){
      this.activate();
      this.showRipple();
      this.setPressTimeout()
    }
  }

  setPressTimeout() { this.pressTimeout = setTimeout(() => { this.pressHandler() }, this.tapLimit) }

  touchIsInRectArea(event: any): boolean {
    const rect = this.el.getBoundingClientRect(),
          ect = event.changedTouches[0],
          touchX = ect.clientX,
          touchY = ect.clientY;

    if(rect.width === rect.height && this.style.borderRadius == '50%'){
      const centerX = rect.left + (rect.width/2),
            centerY = rect.top + (rect.height/2),
            dx = touchX - centerX,
            dy = touchY - centerY,
            distsq = dx*dx + dy*dy,
            rsq = (rect.width/2) * (rect.width/2);
      return distsq < rsq;
    } else {
      const isInRangeX = rect.left < touchX && touchX < (rect.left + rect.width),
            isInRangeY = rect.top < touchY && touchY < (rect.top + rect.height);
      return(isInRangeX && isInRangeY);
    }
  }

  onTouchmove(event: any) {
    if(this.ripple && this.isActive){
      if(this.touchIsInRectArea(event)){
        this.dragRipple(event)
      } else {
        this.ripple.animation = this.ripple.releaseAnimation('50ms');
        this.ripple.animation.play();
        this.delay(90).then(()=>{ this.deactivateAndRemoveRipple() })
      }
    }
  }

  onTouchend(event: any) {
    this.touchendTimeStamp = event.timeStamp;
    let touchDuration = this.touchendTimeStamp - this.touchstartTimeStamp;
    if(this.isActive && this.touchstartTimeStamp !== 0 && touchDuration > 0){
      if(touchDuration >= this.tapLimit) this.pressUpHandler();
      else this.tapHandler()
    }
    if(this.ripple){
      this.ripple.animation = this.ripple.releaseAnimation(this._releaseTransition);
      this.ripple.animation.play();
      this.delay(this.releaseTransitionDuration).then(()=>{ this.deactivateAndRemoveRipple() })
    }
  }

  pressUpHandler() {
    if(!this.ripple) this.deactivate()
    this._pressup.emit(this.event);
  }

  pressHandler() { this._press.emit(this.event) }

  tapHandler() {
    if(this.pressTimeout) clearTimeout(this.pressTimeout)
    this.delay(this.releaseTransitionDuration).then(()=>{ this._tap.emit(this.event) });
  }

  createRippleElement() {
    const rippleFactory = this.componentFactoryResolver.resolveComponentFactory(RippleComponent),
          rippleViewContainerRef = (<any>this.viewContainerRef).injector.view.context.rippleVc;
    this.rippleElement = rippleViewContainerRef.createComponent(rippleFactory);
  }

  showRipple() {

    this.createRippleElement();

    this.ripple = this.rippleElement.instance;

    const ecTouch = this.event.changedTouches[0],
          rect = this.el.getBoundingClientRect(),
          y  = ecTouch.pageY, x  = ecTouch.pageX,
          d = Math.sqrt((rect.width*rect.width) + (rect.height*rect.height)),
          mt = (rect.height-d)/2, ml = (rect.width-d)/2;
 
    this.ripple.dimension = { width: d, height: d };
    this.ripple.position = { top: y - rect.height/2 - rect.top, left: x - rect.width/2 - rect.left, marginTop: mt, marginLeft: ml };
    this.ripple.background = this.rippleBackground;
    this.ripple.fillDuration = this.fillTransitionDuration;
    this.ripple.animation = this.ripple.animate(this._fillTransition);
    this.ripple.animation.play();
  }

  dragRipple(event: any) {
    const rect = this.el.getBoundingClientRect(),
          rippleRect = this.ripple.element.getBoundingClientRect(),
          x = event.touches[0].clientX, y = event.touches[0].clientY,
          dx = rippleRect.width/2, dy = rippleRect.height/2,
          newTop = (y - rect.height/2 - rect.top) + 'px',
          newLeft = (x - rect.width/2 - rect.left) + 'px',
          isInRangeX = (x-dx) > rect.left && (x+dx) < (rect.left + rect.width),
          isInRangeY = (y-dy) > rect.top && (y+dy) < (rect.top + rect.height);                                                                                                                                                                                                                                                                                                      

    if(isInRangeX && isInRangeY) {
      this.ripple.animation = this.ripple.dragAnimation(newLeft, newTop);
      this.ripple.animation.play();
    }
  }
}