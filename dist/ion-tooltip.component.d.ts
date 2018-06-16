import { ElementRef } from '@angular/core';
import { ViewController } from 'ionic-angular';
export declare class IonTooltipComponent {
    viewCtrl: ViewController;
    el: HTMLElement;
    container: any;
    constructor(el: ElementRef, viewCtrl: ViewController);
    ngAfterViewInit(): void;
    close(): void;
}
