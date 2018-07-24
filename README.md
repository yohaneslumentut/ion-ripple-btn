# ion-ripple-btn

An Ionic 3 material design ripple button module.

## Installation

1.Install this module by running the following command:
```shell
npm i ion-ripple-btn
```

2.Import `IonRippleBtnModule` in your `@NgModule`.
```ts
import { IonRippleBtnModule } from 'ion-ripple-btn';

@NgModule({
   ...
   imports: [
      ...
      IonRippleBtnModule
   ]
})
export class MyModule { ... }
```
Now you're ready to use this module

## Examples

1.Use `ion-back-btn`, `ion-title-btn`, `ion-toolbar-btn`, and `ion-more-btn` in custom ionic 3 navbar `ion-nav-bar`

```ts
@Component({
  ...
  template: `
    <ion-header>
      <ion-nav-bar color={{navbarBgColor}}>
        <ion-back-btn></ion-back-btn>
        <ion-title-btn pageTitle={{pageTitle}} pageSubTitle={{pageSubtitle}}></ion-title-btn>
        <ion-more-btn (btnTap)="showMoreDialog($event)" ></ion-more-btn>
        <ion-toolbar-btn 
          tooltipText="Voice Call"
          ttClass="toolbar-tooltip"
          (btnTap)="onTapVoiceCallBtn($event)"
        >
          <ion-icon name="md-call"></ion-icon>
        </ion-toolbar-btn>
        <ion-toolbar-btn 
          tooltipText="Video Call"
          ttClass="toolbar-tooltip"
          (btnTap)="onTapVideoCallBtn($event)"
        >
          <ion-icon name="md-videocam"></ion-icon>
        </ion-toolbar-btn>
      </ion-navbar>
    </ion-header>
  ...
})
export class YourPageClass {

  pageTitle: string = 'Your Page Name';
  pageSubtitle: string = 'page sub-title'
  navbarBgColor: string = 'primary'

  ...

  showMoreDialog(event: any) {
    ...
  }

  ...

  onTapVideoCallBtn(event: any) {
    ...
  }

  onTapVoiceCallBtn(event: any) {
    ...
  }

  ...
}

```
then create a custom tooltip styling (ttClass), title, and subtitle style in `your_project/src/app/app.scss` :

```html
  ...
  .toolbar-tooltip {
    border-radius: 40px;
    height: 40px;
    line-height: 3.2;
    font-size: 13px;
    background: #676A66;
    min-width: 90px;
    opacity: 0.9;
    color: #fff;
    margin-top: -8px;
    padding-left: 15px;
    padding-right: 15px;
  }

  .page-title {
    color: #fff;
    font-size: 2rem;
    font-weight: 500;
  }

  .page-subtitle {
    color: #fff;
    font-size: 1.2rem;
    font-weight: 400;
  }
  ...
```

2.Use `ion-ripple-btn` component directly

```ts
...

@Component({
  ...
  template: `
    <ion-header>
      ...
    </ion-header>
    <ion-content>
      ...
        <ion-ripple-btn cssClass="custom-btn" 
          activeBgColor="rgba(0,0,0,0.1)"
          rippleBgColor="rgba(0,0,0,0.05)"
          ttPosition="right"
          tooltipText="Hello world"
        >
          <ion-icon name="md-call"></ion-icon>
        </ion-ripple-btn>
      ...
    </ion-content>
  `
})

...

```
then create a custom button styling (cssClass) in `your_project/src/app/app.scss` :

```html
  ...
  .custom-btn {
    background-color: #fff;
    border: none;
    border-radius: 50%;

    ...

    outline: none;
    width: 100px;
    height: 100px;
  }
  ...
```

3.Create your own navbar button component by using `ripple` directive. <br>
Note: Don't forget to add ripple container `<ng-container #rippleVc></ng-container>` at template and `@ViewChild("rippleVc", {read: ViewContainerRef}) rippleVc: ViewContainerRef` decorator at your class.

```ts

import { Component, ViewChild, ElementRef, ViewContainerRef } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'your-custom-back-btn',
  styles: [
    `:host {
      float: left;
      margin-left: -10px;
    }`,
    `:host button {
      color: #fff;
      font-size: 2rem;
      font-weight: bold;
      border-radius: 100%;
      background-color: transparent;
      position: relative;
      overflow: hidden;
    }`
  ],
  template: `
    <button ripple containerClass="header" size="1.25"
      fillTransition="700ms cubic-bezier(0.4, 0.0, 1, 1)"
      releaseTransition="70ms cubic-bezier(0.4, 0.0, 0.2, 1)"
      (_tap)="back()"
      (_pressup)="back()"
    >
      <ion-icon name="md-arrow-back"></ion-icon>
      <ng-container #rippleVc></ng-container>
    </button>
  `
})
export class YourCustomBackBtnComponent {

  elRef:ElementRef

  nav: any

  @ViewChild("rippleVc", {read: ViewContainerRef}) rippleVc: ViewContainerRef;

  constructor( _nav: NavController , _elRef: ElementRef){ 
    this.elRef = _elRef
    this.nav = _nav
  }

  back() {
    this.nav.pop();
  }
}

```

4.Create your own navbar button component by extending `RippleButtonComponent` , `ripple`directive and `tooltip-navbar` directive.

```ts

import { Component } from '@angular/core';
import { RippleButtonComponent } from 'ion-ripple-btn';

@Component({
  selector: 'your-custom-more-btn',
  styles: [
    `:host {
      float: right;
      margin-right: -12px;
    }`,
    `:host button {
      color: #fff;
      font-size: 2rem;
      font-weight: bold;
      border-radius: 100%;
      background-color: transparent;
      width: 78px;
      height: 78px;
      margin-top: -12px;
      margin-bottom: -12px;
    }`
  ],
  template: `
    <button ripple tooltip-navbar
      rippleBgColor="{{ getRippleBgColor() }}"
      activeBgColor="{{ getActiveBgColor() }}"
      tapLimit="{{ getTapLimit() }}"
      tooltipText="{{ getTooltipText() }}"
      (_tap)="onTap($event)"
      (_press)="onPress($event)"
      (_pressup)="onPressup($event)"
    >
      <ion-icon name="md-more"></ion-icon>
      <ng-container #rippleVc></ng-container>
    </button>
  `
})
export class YourCustomMoreBtnComponent extends RippleButtonComponent {

  getTooltipText() {
    return this.tooltipText || 'More options'
  }
}

```

## Available Directive

#### `ripple`
Use `ripple` directive to create your custom ripple button

#### `tooltip-navbar`
Please use `tooltip-navbar` to implement tooltip of navbar ripple button.

## Ripple Directive Available Inputs and attribute
If you want to develop your own component by using `ripple` directive, you can use following inputs:

#### `tapLimit`
To distinguish touch end of a tap event and a pressup event, we use `tapLimit`

#### `size` & `containerClass`
When a header toolbar button need no exact size, you can use `size` and `containerClass` input. The `size` input is your button size against your container size and the `containerClass` is an identifier of your container.

#### `rippleBgColor`
You can customize your ripple background color use this input

#### `activeBgColor`
The `activeBgColor` is used to customize your button on active state

#### `tooltipText`
As input of your tooltip text

#### `fillTransition`
Ripple animation transition value when the ripple start to fill the button.<br>
Example: `"700ms cubic-bezier(0.4, 0.0, 1, 1)"`

#### `releaseTransition`
Ripple animation transition value at touchend (ripple fast filling animation).<br>
Example: `"70ms cubic-bezier(0.4, 0.0, 0.2, 1)"`

#### `cssClass`
To customize your host button using custom style in `your_project/src/app/app.scss`

#### `draggableRipple`
Please use this attribute to enable user drag the ripple

## Specific Button Height
For an exact buton height (h px) in a container with a determined height (cH px), you can use formula:<br>
```html
  margin-top = (h - cH)/2
  margin-bottom = (h - cH)/2
```

## Available `events`
For all descendant of `RippleButtonComponent` will have 3 legacy events:
  1. `btnTap`
  2. `btnPress`
  3. `btnPressup` 

## Custom Tooltip
You can modify the `ion-ripple-btn` and `ion-toolbar-btn` tooltip style by using `ttClass` as example no.1 above.

## Tooltip Position
Default position tooltip  of `ion-ripple-btn` is at the bottom. You can use another tooltip position:
  1. `top`
  2. `topLeft`
  3. `topRight`
  4. `bottomLeft`
  5. `bottomRight`
  6. `left`
  7. `right`

Example:
```html
  <ion-ripple-btn
    ...

    ttPosition="bottomRight"
    ...
  >
    ...

  </ion-ripple-btn>
```

## Angular Version Error

If you find error as follow:
```html
Typescript Error.
Cannot redeclare block-scoped variable 'ngDevMode'.
```
it might because of your app angular version have a different version with this module.<br>
To solve the problem, please update your `tsconfig.json` at root of your project with additional:
```ts
{
  "compilerOptions": {
    "baseUrl": "",
    ...

    "paths": { 
      "@angular/*": ["node_modules/@angular/*"] 
    }
  },
  ...

} 
```

<br>
Thank you :smile:  INDNJC@2018
