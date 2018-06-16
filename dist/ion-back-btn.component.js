"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ionic_angular_1 = require("ionic-angular");
var IonBackBtnComponent = (function () {
    function IonBackBtnComponent(nav) {
        this.nav = nav;
    }
    IonBackBtnComponent.prototype.back = function () {
        this.nav.pop();
    };
    IonBackBtnComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'ion-back-btn',
                    styles: [
                        ":host .ion-back-btn-wrapper {\n      float: left;\n      margin-left: -10px;\n    }",
                        ":host .ion-back-btn-wrapper .ease-out { transition: background-color 0.4s ease-out; }",
                        ":host .ion-back-btn-wrapper button {\n      position: relative;\n      color: #fff;\n      font-size: 2rem;\n      font-weight: bold;\n      border-radius: 100%;\n      background-color: transparent;\n    }"
                    ],
                    template: "\n    <div class=\"ion-back-btn-wrapper\">\n      <button ripple-btn\n        size=\"1.35\"\n        interval=\"400\"\n        containerClass=\"header\"\n        wrapperClass=\"ion-back-btn-wrapper\"\n        (btnTapped)=\"back()\"\n        (btnPressup)=\"back()\"\n      >\n        <ion-icon name=\"md-arrow-back\"></ion-icon>\n      </button>\n    </div>\n  "
                },] },
    ];
    /** @nocollapse */
    IonBackBtnComponent.ctorParameters = function () { return [
        { type: ionic_angular_1.NavController, },
    ]; };
    IonBackBtnComponent.propDecorators = {
        "interval": [{ type: core_1.Input, args: ['interval',] },],
    };
    return IonBackBtnComponent;
}());
exports.IonBackBtnComponent = IonBackBtnComponent;
//# sourceMappingURL=ion-back-btn.component.js.map