import { Component, ElementRef } from '@angular/core';
import { ViewController } from 'ionic-angular';
var IonTooltipComponent = (function () {
    function IonTooltipComponent(el, viewCtrl) {
        this.viewCtrl = viewCtrl;
        this.el = el.nativeElement;
    }
    IonTooltipComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        var styles = {
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
        };
        this.container = this.el.children[0].closest('.popover-content');
        for (var k in styles) {
            this.container.style[k] = styles[k];
        }
        setTimeout(function () {
            if (_this.viewCtrl)
                _this.close();
        }, 2500);
    };
    IonTooltipComponent.prototype.close = function () {
        this.viewCtrl.dismiss();
    };
    IonTooltipComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ion-tooltip',
                    template: "<span></span>",
                },] },
    ];
    /** @nocollapse */
    IonTooltipComponent.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: ViewController, },
    ]; };
    return IonTooltipComponent;
}());
export { IonTooltipComponent };
//# sourceMappingURL=ion-tooltip.component.js.map