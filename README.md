# ion-ripple-btn

## Installation

1.Install this module by running the following command:
```shell
npm i ion-ripple-btn
```

2.Import `IonRippleBtnModule` in your `@NgModule`.
```ts
import { IonRippleBtnModule } from 'ionic-tooltips';

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

1.Use back button and more buton in ionic 3 navbar

```html
<ion-header>
  <ion-navbar color="primary" [hideBackButton]="true">
    <ion-back-btn></ion-back-btn>
    <ion-more-btn></ion-more-btn>
  </ion-navbar>
</ion-header>
```
2.Use `ripple-btn` directive in your custom button. The `size` value is the buton size against it's container.
  The `interval` is a limit of touch duration(ms) which determine touch is a press or tap.
  Thera are 3 available event `btnTapped`, `btnPressed`,`btnPressup`.
  If you want the ripple to be dark, use `darken` attribute in your button tag

```ts
...

@Component({
  selector: 'your-selector',
  styles: [
    `:host .wrapper-class {
      float: left;
      margin-left: -10px;
    }`,
    `:host .wrapper-class .ease-out { transition: background-color 0.4s ease-out; }`,
    `:host .wrapper-class button {
      position: relative;
      color: #fff;
      font-size: 2rem;
      font-weight: bold;
      border-radius: 100%;
      background-color: transparent;
    }`
  ],
  template: `
    <div class="wrapper-class">
      <button ripple-btn
        size="1.35"
        interval="400"
        containerClass="container-class"
        wrapperClass="wrapper-class"
        (btnTapped)="onTap()"
        (btnPressup)="onPress()"
      >
        <ion-icon name="md-arrow-back"></ion-icon>
      </button>
    </div>
  `
})
export class YourCustomComponent {


```



