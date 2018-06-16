import { Component, ElementRef } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
  selector: 'ion-tooltip',
  template: `<span></span>`,
})
export class IonTooltipComponent {

  el: HTMLElement
  container: any

  constructor(el: ElementRef, public viewCtrl: ViewController) {
    this.el = el.nativeElement;
  }

  ngAfterViewInit() {

    const styles:any = {
      display: 'inline-block',
      whiteSpace: 'nowrap',
      minWidth: '56px',
      width: 'unset',
      height: '30px',
      backgroundColor: '#5f6060',
      textAlign: 'center',
      padding: '8px 12px',
      borderRadius: '5px',
      color: '#fff',
      fontSize: '12px',
      opacity: 0.8
    }

    this.container = this.el.children[0].closest('.popover-content');

    for( let k in styles ) {
      this.container.style[k] = styles[k]
    }

    setTimeout(() => {
      if(this.viewCtrl) this.close();
    }, 2500)
  }

  close() {
    this.viewCtrl.dismiss();
  }
}