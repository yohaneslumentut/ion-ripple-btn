import { Component, Input, } from '@angular/core';
import { NavController, PopoverController } from 'ionic-angular';
import { IonMoreTooltipComponent } from './ion-more-tooltip.component';
var IonMoreBtnComponent = (function () {
    function IonMoreBtnComponent(nav, popoverCtrl) {
        this.nav = nav;
        this.popoverCtrl = popoverCtrl;
    }
    IonMoreBtnComponent.prototype.showPopover = function () {
        // this.nav.pop();
    };
    IonMoreBtnComponent.prototype.showTooltip = function (event) {
        var popover = this.popoverCtrl.create(IonMoreTooltipComponent);
        var x = event.changedTouches[0].pageX;
        var evt = {
            target: {
                getBoundingClientRect: function () {
                    return {
                        top: 56,
                        left: x
                    };
                }
            }
        };
        popover.present({
            ev: evt
        });
    };
    IonMoreBtnComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ion-more-btn',
                    styles: [
                        ":host .ion-more-btn-wrapper {\n      float: right;\n      margin-right: -10px;\n    }",
                        ":host .ion-more-btn-wrapper .ease-out { transition: background-color 0.4s ease-out; }",
                        ":host .ion-more-btn-wrapper button {\n      position: relative;\n      color: #fff;\n      font-size: 2rem;\n      font-weight: bold;\n      border-radius: 100%;\n      background-color: transparent;\n    }"
                    ],
                    template: "\n    <div class=\"ion-more-btn-wrapper\">\n      <button ripple-btn\n        size=\"1.35\"\n        interval=\"400\"\n        containerClass=\"header\"\n        wrapperClass=\"ion-more-btn-wrapper\"\n        (btnTapped)=\"showPopover()\"\n        (btnPressed)=\"showTooltip($event)\"\n      >\n        <ion-icon name=\"md-more\"></ion-icon>\n      </button>\n    </div>\n  "
                },] },
    ];
    /** @nocollapse */
    IonMoreBtnComponent.ctorParameters = function () { return [
        { type: NavController, },
        { type: PopoverController, },
    ]; };
    IonMoreBtnComponent.propDecorators = {
        "interval": [{ type: Input, args: ['interval',] },],
    };
    return IonMoreBtnComponent;
}());
export { IonMoreBtnComponent };
//# sourceMappingURL=ion-more-btn.component.js.map