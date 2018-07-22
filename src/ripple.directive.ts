import { Directive, ElementRef, Input, Output, Renderer, Renderer2, EventEmitter, HostBinding, ComponentFactoryResolver, ViewContainerRef, ComponentRef } from '@angular/core';
import { style, animate, AnimationBuilder } from '@angular/animations';
import { RippleComponent } from './ripple.component';

@Directive({
  selector: '[ripple]',
  host: {
    '(touchend)': 'onTouchend($event)',
    '(touchstart)': 'onTouchstart($event)'
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
  _releaseTransition: string

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

  @Input()
  set draggableRipple(val:boolean) {
    this._draggableRipple = typeof val !== 'boolean' || val != true
  }
  get draggableRipple(): boolean { return this._draggableRipple }

  private _draggableRipple:boolean = false

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
    this.setDragAnimation();
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
    this._fillTransition = this.fillTransition || '700ms cubic-bezier(0.4, 0.0, 1, 1)'
    this._releaseTransition = this.releaseTransition || '90ms cubic-bezier(0.4, 0.0, 0.2, 1)'
  }

  setDragAnimation() {
    const hammer = new (window as any)['Hammer'](this.el);
    hammer.get('pan').set({ direction: (window as any)['Hammer'].DIRECTION_ALL });
    hammer.on('pan', (ev: any) => { if(this._draggableRipple) this.onPan(ev) });
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

  onPan(ev: any) {
    if(this.ripple && ev.distance < parseInt(this.style.width,10)/2)this.dragRipple(ev)
  }

  onTouchstart() {
    this.event = event;
    this.touchstartTimeStamp = event.timeStamp;
    if(!this.isActive){
      this.activate();
      this.showRipple();
      this.setPressTimeout()
    }
  }

  setPressTimeout() { this.pressTimeout = setTimeout(() => { this.pressHandler() }, 700) }

  onTouchend() {
    this.touchendTimeStamp = event.timeStamp;
    let touchDuration = this.touchendTimeStamp - this.touchstartTimeStamp;
    if(this.isActive && this.touchstartTimeStamp !== 0 && touchDuration > 0){
      if(touchDuration >= this.tapLimit) this.pressUpHandler();
      else this.tapHandler()
    }
    if(this.ripple){
      this.ripple.releaseAnimation(this._releaseTransition);
      this.delay(90).then(()=>{ this.deactivateAndRemoveRipple() })
    }
  }

  pressUpHandler() {
    if(!this.ripple) this.deactivate()
    this._pressup.emit(this.event);
  }

  pressHandler() { this._press.emit(this.event) }

  tapHandler() {
    if(this.pressTimeout) clearTimeout(this.pressTimeout)
    this.delay(90).then(()=>{ this._tap.emit(this.event) });
  }

  createRippleElement() {
    const rippleFactory = this.componentFactoryResolver.resolveComponentFactory(RippleComponent),
          rippleViewContainerRef = (<any>this.viewContainerRef).injector.view.context.rippleVc;
    this.rippleElement = rippleViewContainerRef.createComponent(rippleFactory);
  }

  showRipple() {

    this.createRippleElement();

    const rc: RippleComponent = this.rippleElement.instance,
          ecTouch = this.event.changedTouches[0],
          rect = this.el.getBoundingClientRect(),
          y  = ecTouch.pageY, x  = ecTouch.pageX;

    let d: number = rect.height, mt: number = 0, ml:number = 0;

    if(this.style.borderRadius < '70%'){
      d = Math.sqrt((rect.width*rect.width) + (rect.height*rect.height));
      mt = (rect.height-d)/2; ml = (rect.width-d)/2;
    }

    rc.init.then(() => {
      rc.dimension = { width: d, height: d };
      rc.position = { top: y - rect.height/2 - rect.top, left: x - rect.width/2 - rect.left, marginTop: mt, marginLeft: ml };
      rc.background = this.rippleBackground;
      rc.animate(this._fillTransition);
      this.ripple = rc;
    })
  }

  dragRipple(ev: any) {
    const rect = this.el.getBoundingClientRect(),
          y  = ev.center.y, x  = ev.center.x,
          newTop = (y - rect.height/2 - rect.top) + 'px',
          newLeft = (x - rect.width/2 - rect.left) + 'px';
    this.ripple.dragAnimation(newLeft, newTop)
  }
}