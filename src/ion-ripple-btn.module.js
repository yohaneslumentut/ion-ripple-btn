import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { RippleBtnDirective } from './ripple-btn.directive';
import { IonBackBtnComponent } from './ion-back-btn.component';
import { IonMoreBtnComponent } from './ion-more-btn.component';
import { IonTooltipComponent } from './ion-tooltip.component';
import { IonMoreTooltipComponent } from './ion-more-tooltip.component';
var IonRippleBtnModule = (function () {
    function IonRippleBtnModule() {
    }
    IonRippleBtnModule.decorators = [
        { type: NgModule, args: [{
                    entryComponents: [
                        IonBackBtnComponent,
                        IonMoreBtnComponent,
                        IonTooltipComponent,
                        IonMoreTooltipComponent
                    ],
                    declarations: [
                        RippleBtnDirective,
                        IonBackBtnComponent,
                        IonMoreBtnComponent,
                        IonTooltipComponent,
                        IonMoreTooltipComponent
                    ],
                    imports: [
                        IonicModule
                    ],
                    exports: [
                        RippleBtnDirective,
                        IonBackBtnComponent,
                        IonMoreBtnComponent,
                        IonTooltipComponent,
                        IonMoreTooltipComponent
                    ]
                },] },
    ];
    return IonRippleBtnModule;
}());
export { IonRippleBtnModule };
//# sourceMappingURL=ion-ripple-btn.module.js.map