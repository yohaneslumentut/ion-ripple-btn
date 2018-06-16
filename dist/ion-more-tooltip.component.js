"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ion_tooltip_component_1 = require("./ion-tooltip.component");
var IonMoreTooltipComponent = (function (_super) {
    __extends(IonMoreTooltipComponent, _super);
    function IonMoreTooltipComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IonMoreTooltipComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'ion-more-tooltip',
                    template: "<span>More Options</span>",
                },] },
    ];
    return IonMoreTooltipComponent;
}(ion_tooltip_component_1.IonTooltipComponent));
exports.IonMoreTooltipComponent = IonMoreTooltipComponent;
//# sourceMappingURL=ion-more-tooltip.component.js.map