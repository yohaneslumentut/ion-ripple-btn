import { Component, ViewChild, ElementRef, ViewContainerRef, Input, Output, Renderer2, EventEmitter, ComponentFactoryResolver } from '@angular/core';

@Component({
  selector: 'ripple-button',
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
      tapLimit="{{ getTapLimit() }}"
      (_tap)="onTap($event)"
      (_press)="onPress($event)"
      (_pressup)="onPressup($event)"
    >
      <ng-content></ng-content>
      <ng-container #rippleVc></ng-container>
    </button>
  `
})
export class RippleButtonComponent {

  element:HTMLElement
  elRef: ElementRef
  renderer2: Renderer2
  componentFactoryResolver: ComponentFactoryResolver
  tooltipElement: any
  tooltipFadeTimeout: any
  tooltipDestroyTimeout: any
  tooltipRemovalTimeout: any

  @ViewChild("rippleVc", {read: ViewContainerRef}) rippleVc: ViewContainerRef;

  @Input() cssClass: string
  @Input() activeBgColor: string 
  @Input() rippleBgColor: string
  @Input() tapLimit: number
  @Input() tooltipText: string
  @Input() ttPosition: string
  @Input() ttClass: string

  @Output() btnTap: EventEmitter<any> = new EventEmitter();
  @Output() btnPress: EventEmitter<any> = new EventEmitter();
  @Output() btnPressup: EventEmitter<any> = new EventEmitter();

  constructor(
    _elRef: ElementRef,
    _renderer2: Renderer2,
    _componentFactoryResolver: ComponentFactoryResolver
  ){
    this.elRef = _elRef;
    this.renderer2 = _renderer2;
    this.componentFactoryResolver = _componentFactoryResolver
  }

  delay:any = (ms:number) => new Promise(_ => setTimeout(_, ms))

  ngAfterViewInit() {
    this.element = this.elRef.nativeElement.children[0];
    this.setClassName();
  }

  setClassName() { 
    if(this.cssClass)this.renderer2.addClass(this.element, this.cssClass)
  }

  getRippleBgColor() { 
    return this.rippleBgColor || null
  }

  getActiveBgColor() {
    return this.activeBgColor || null
  }

  getTapLimit() {
    return this.tapLimit || 400
  }

  getTooltipText() {
    return this.tooltipText || null
  }

  getTooltipPosition() {
    return this.ttPosition || null
  }

  getCssClass() {
    return this.ttClass || null
  }

  onTap(event: any) {
    this.btnTap.emit(event)
  }

  onPress(event: any) {
    this.btnPress.emit(event)
  }

  onPressup(event: any) {
    this.btnPress.emit(event)
  }
}