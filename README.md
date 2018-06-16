# ion-ripple-btn

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

1.Use back button and more buton in ionic 3 navbar

```html
<ion-header>
  <ion-navbar color="primary" [hideBackButton]="true">
    <ion-back-btn></ion-back-btn>
    <ion-more-btn></ion-more-btn>
  </ion-navbar>
</ion-header>
```

2.Create your own button component

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
export class YourCustomButtonComponent {

...

}

```

## Usage

#### `ripple-btn`
Use `ripple-btn` directive to create your custom ripple button.

#### `size`
The `size` value is the buton size against it's container.

#### `interval`
The `interval` is a limit of touch duration(ms) which determine touch is a press or tap.

#### `events`
There are 3 available events:
  1. `btnTapped`
  2. `btnPressed`
  3. `btnPressup`

#### `darken`
If you want the ripple to be dark, use `darken` attribute in your button tag
<br>
## Contribution
- **Having an issue**? or looking for support? [Open an issue](https://github.com/yohaneslumentut/ion-ripple-btn/issues/new) and we will get you the help you need.
- Got a **new feature or a bug fix**? Fork the repo, make your changes, and submit a pull request.

## Support this project
If you find this project useful, please star the repo. Also, share it with friends and colleagues that might find this useful as well. Thank you :smile:  INDNJC@2018
