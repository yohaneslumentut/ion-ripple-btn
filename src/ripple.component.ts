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

  element: HTMLElement
  animation: any
  transition: any
  fillDuration: any
  backgroundColor: string

  private setStyle(prop: string, val: any) {
    this.renderer.setStyle(this.element, prop, val);
  }

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
  set background(color: string) { this.backgroundColor = color }

  constructor(
    public elementRef: ElementRef,
    private renderer: Renderer2,
    private _builder: AnimationBuilder,
  ) {
    this.element = elementRef.nativeElement;
  }

  animate(transition: string): any {
    return this._builder.build([
      animate(transition, keyframes([
        style({
          background: this.backgroundColor,
          transform: 'scale(0)',
          offset: 0
        }),
        style({
          transform: 'scale(1)',
          left: 0,
          top: 0,
          offset: 1.0
        })
      ]))
    ]).create(this.element);
  }

  releaseAnimation(transition: string): any {
    return this._builder.build([
      animate(transition ,style({
        transform: 'scale(1)',
        left: 0,
        top: 0
      }))
    ]).create(this.element);
  }

  dragAnimation(newLeft: string, newTop: string): any{
    return this._builder.build([
      animate(this.fillDuration,keyframes([
        style({
          left: newLeft,
          top: newTop
        }),
        style({
          transform: 'scale(1)',
          left: 0,
          top: 0
        })
      ]))
    ]).create(this.element);
  }
}