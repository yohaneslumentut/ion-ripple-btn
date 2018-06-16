import { NavController, PopoverController } from 'ionic-angular';
export declare class IonMoreBtnComponent {
    nav: NavController;
    popoverCtrl: PopoverController;
    interval: number;
    constructor(nav: NavController, popoverCtrl: PopoverController);
    showPopover(): void;
    showTooltip(event: any): void;
}
