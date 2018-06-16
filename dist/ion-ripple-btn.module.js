"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ionic_angular_1 = require("ionic-angular");
var ripple_btn_directive_1 = require("./ripple-btn.directive");
var ion_back_btn_component_1 = require("./ion-back-btn.component");
var ion_more_btn_component_1 = require("./ion-more-btn.component");
var ion_tooltip_component_1 = require("./ion-tooltip.component");
var ion_more_tooltip_component_1 = require("./ion-more-tooltip.component");
var IonRippleBtnModule = (function () {
    function IonRippleBtnModule() {
    }
    IonRippleBtnModule.decorators = [
        { type: core_1.NgModule, args: [{
                    entryComponents: [
                        ion_back_btn_component_1.IonBackBtnComponent,
                        ion_more_btn_component_1.IonMoreBtnComponent,
                        ion_tooltip_component_1.IonTooltipComponent,
                        ion_more_tooltip_component_1.IonMoreTooltipComponent
                    ],
                    declarations: [
                        ripple_btn_directive_1.RippleBtnDirective,
                        ion_back_btn_component_1.IonBackBtnComponent,
                        ion_more_btn_component_1.IonMoreBtnComponent,
                        ion_tooltip_component_1.IonTooltipComponent,
                        ion_more_tooltip_component_1.IonMoreTooltipComponent
                    ],
                    imports: [
                        ionic_angular_1.IonicModule
                    ],
                    exports: [
                        ripple_btn_directive_1.RippleBtnDirective,
                        ion_back_btn_component_1.IonBackBtnComponent,
                        ion_more_btn_component_1.IonMoreBtnComponent,
                        ion_tooltip_component_1.IonTooltipComponent,
                        ion_more_tooltip_component_1.IonMoreTooltipComponent
                    ]
                },] },
    ];
    return IonRippleBtnModule;
}());
exports.IonRippleBtnModule = IonRippleBtnModule;
//# sourceMappingURL=ion-ripple-btn.module.js.map