import { Component, Input, ElementRef, Renderer, Renderer2, ComponentFactoryResolver } from '@angular/core';
import { RippleButtonComponent } from './ripple-button.component';

@Component({
  selector: 'ion-title-btn',
  styles: [
    `:host {
      float: left;
      margin-left: -10px;
      overflow: hidden;
    }`,
    `:host button {
      background-color: transparent;
      margin-top: 0px;
      margin-bottom: 0px;
      padding-left: 10px;
      text-align: left;
      white-space: nowrap;
      text-overflow: ellipsis;
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

  renderer: Renderer
  leftPos: number

  @Input() pageTitle: string
  @Input() pageSubTitle: string

  constructor(
    _elRef: ElementRef,
    _renderer: Renderer,
    _renderer2: Renderer2,
    _componentFactoryResolver: ComponentFactoryResolver
  ){
    super(_elRef, _renderer2, _componentFactoryResolver)
    this.elRef = _elRef;
    this.renderer = _renderer;
    this.renderer.listen(window, 'resize', () => { this.onWindowResize() })
  }

  onWindowResize() { setTimeout(() => { this.setWidth() }, 0) }

  ngAfterViewInit() {
    this.element = this.elRef.nativeElement.children[0];
    this.setClassName();
    this.setInitialSize();
  }

  setHeight() {
    const container: any = this.element.children[0].closest('.' + "header");
    this.element.style.height = container.offsetHeight + 'px';
  }

  setWidth() {
    const toolbarChildren = this.getToolbarChildren(),
          titleElement = this.elRef.nativeElement,
          leftPos = this.leftPos,
          elementsLeftPos: any = [];

    [].forEach.call(toolbarChildren, (element: any) => {
      let elementLeft = element.getBoundingClientRect().left;
      if(element !== titleElement && elementLeft > leftPos) elementsLeftPos.push(elementLeft)
    });

    let width: number, nextElementLeftPos: number;
    nextElementLeftPos = Math.min.apply(null, elementsLeftPos);
    width =  nextElementLeftPos - leftPos;

    this.renderer.setElementStyle(this.element, 'width', width + 'px')
  }

  setInitialSize() {
    setTimeout(() => { 
      this.leftPos = this.elRef.nativeElement.getBoundingClientRect().left;
      this.setWidth();
      this.setHeight();
    }, 0);
  }

  getToolbarChildren() {
    const toolbar: any = this.elRef.nativeElement.children[0].closest('.' + "toolbar-content");
    return toolbar.children;
  }
}