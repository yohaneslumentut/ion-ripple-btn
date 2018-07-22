import { Component, ElementRef, Renderer2, Input } from '@angular/core';
import { style, animate, keyframes, AnimationBuilder } from '@angular/animations';

@Component({
  selector: 'ripple',
  template: '<ng-content></ng-content>',
  styles: [
    `:host {
      position: absolute;
      border-radius: 100%;
      display: block;
    }`
  ]
})
export class RippleComponent  {

  @Input()
  set dimension(o: any) {
    this.setStyle('width', o.width  + 'px'); this.setStyle('height', o.height  + 'px');
  }

  @Input()
  set position(o: any) {
    this.setStyle('top', o.top  + 'px'); this.setStyle('left', o.left  + 'px');
    this.setStyle('marginTop', o.marginTop  + 'px'); this.setStyle('marginLeft', o.marginLeft  + 'px');
  }

  @Input()
  set background(color: string) { this._backgroundColor = color }

  init: Promise<void>
  animation: any
  transition: any

  private initResolve: Function;
  private _backgroundColor: string

  constructor(
    public elementRef: ElementRef,
    private renderer: Renderer2,
    private _builder: AnimationBuilder,
  ) {
    this.init = new Promise<void>(resolve => { this.initResolve = resolve });
  }

  ngAfterViewInit() { this.initResolve() }

  private setStyle(prop: string, val: any) {
    this.renderer.setStyle(this.getNativeElement(), prop, val);
  }

  private getNativeElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  animate(transition: string) {

    const animation = this._builder.build([
      animate(transition, keyframes([
        style({
          background: this._backgroundColor,
          transform: 'scale(0.1)',
          offset: 0
        }),
        style({
          transform: 'scale(1)',
          left: 0,
          top: 0,
          offset: 1.0
        })
      ]))
    ]);

    this.animation = animation.create(this.getNativeElement());
    this.animation.play();

  }

  releaseAnimation(transition: string) {

    const animation = this._builder.build([
      animate(transition ,style({
        transform: 'scale(1)',
        left: 0,
        top: 0
      }))
    ]);

    this.animation = animation.create(this.getNativeElement());
    this.animation.play();

  }

  dragAnimation(newLeft: string, newTop: string){

    const animation = this._builder.build([
      style({
        left: newLeft,
        top: newTop
      }),
      animate(700,style({
        transform: 'scale(1)',
        left: 0,
        top: 0
      }))
    ]);

    this.animation = animation.create(this.getNativeElement());
    this.animation.play();

  }
}