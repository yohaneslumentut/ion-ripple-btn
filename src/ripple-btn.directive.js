import { Directive, ElementRef, Input, Output, Renderer, EventEmitter, HostBinding } from '@angular/core';
var RippleBtnDirective = (function () {
    function RippleBtnDirective(el, renderer) {
        this.renderer = renderer;
        // Status
        this.isActive = false;
        this.isTapping = false;
        this.isAnimating = false;
        this.pressTimeoutRunning = false;
        // Timing
        this.startTimeStamp = 0;
        this.endTimeStamp = 0;
        this.btnTapped = new EventEmitter();
        this.btnPressed = new EventEmitter();
        this.btnPressup = new EventEmitter();
        this._darken = false;
        this.el = el.nativeElement;
        this.delay = function (ms) { return new Promise(function (_) { return setTimeout(_, ms); }); };
    }
    Object.defineProperty(RippleBtnDirective.prototype, "darken", {
        get: function () { return this._darken; },
        set: function (val) {
            this._darken = typeof val !== 'boolean' || val != true;
        },
        enumerable: true,
        configurable: true
    });
    RippleBtnDirective.prototype.ngAfterViewInit = function () {
        this.getWrapperAndContainer();
        this.setBackgroundColor();
        this.setDimensions();
    };
    RippleBtnDirective.prototype.getWrapperAndContainer = function () {
        this.wrapper = this.el.children[0].closest('.' + this.wrapperClass);
        this.container = this.el.children[0].closest('.' + this.containerClass);
        this.containerHeight = this.container.offsetHeight;
    };
    RippleBtnDirective.prototype.setBackgroundColor = function () {
        this.activeBackgroundColor = this.darken ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.15)';
        this.nonactiveBackgroundColor = this.darken ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,0)';
        this.rippleBackground = this.darken ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255, 0.1)';
    };
    RippleBtnDirective.prototype.setDimensions = function () {
        var height = this.containerHeight * this.size;
        var heightDif = this.containerHeight - height;
        this.width = this.height = height + 'px';
        this.marginTop = heightDif / 2 + 'px';
        this.renderer.setElementStyle(this.wrapper, 'height', this.containerHeight + 'px');
    };
    RippleBtnDirective.prototype.activate = function () {
        this.el.classList.add('ease-out');
        this.backgroundColor = this.activeBackgroundColor;
        this.isActive = true;
    };
    RippleBtnDirective.prototype.deactivate = function (ripple) {
        if (ripple === void 0) { ripple = null; }
        if (ripple)
            ripple.remove();
        this.backgroundColor = this.nonactiveBackgroundColor;
        this.isActive = false;
        this.resetting();
    };
    RippleBtnDirective.prototype.resetting = function () {
        this.startTimeStamp = this.endTimeStamp = 0;
        this.isTapping = this.isAnimating = false;
    };
    RippleBtnDirective.prototype.pressing = function () { this.isTapping = false; };
    RippleBtnDirective.prototype.tapping = function () { this.isTapping = true; };
    RippleBtnDirective.prototype.onTouchstart = function (e) {
        this.resetting();
        this.event = e;
        this.startTimeStamp = e.timeStamp;
        if (!this.isActive) {
            this.activate();
            this.startPressWatcher(this.interval);
        }
    };
    RippleBtnDirective.prototype.startPressWatcher = function (interval) {
        var _this = this;
        if (interval === void 0) { interval = 400; }
        this.pressTimeoutRunning = true;
        this.pressTimeout = setTimeout(function () {
            if (!_this.isTapping)
                _this.pressHandler(interval);
            _this.pressTimeoutRunning = false;
        }, interval);
    };
    RippleBtnDirective.prototype.stopPressWatcher = function () {
        clearTimeout(this.pressTimeout);
        this.pressTimeoutRunning = false;
    };
    RippleBtnDirective.prototype.onTouchend = function (e) {
        if (this.pressTimeoutRunning)
            this.stopPressWatcher();
        this.endTimeStamp = e.timeStamp;
        var touchDuration = this.endTimeStamp - this.startTimeStamp;
        // Handle active button & a valid touch lifecycle only
        if (this.isActive && this.startTimeStamp !== 0 && touchDuration > 0) {
            this.isActive = false;
            // This is a pressing
            if (touchDuration >= this.interval) {
                this.pressUpHandler();
            }
            else {
                this.tapHandler(touchDuration);
            }
        }
    };
    RippleBtnDirective.prototype.pressUpHandler = function () {
        var _this = this;
        this.delay(11).then(function () { if (!_this.isAnimating)
            _this.deactivate(); }); // wait until ripple animated
    };
    RippleBtnDirective.prototype.pressHandler = function (touchDuration) {
        var _this = this;
        this.pressing();
        this.triggerRipple(touchDuration, function (ripple, duration) {
            _this.delay(duration).then(function () { return _this.btnPressed.emit(_this.event); });
            var watcher = setInterval(function () {
                if (!_this.isAnimating && !_this.isActive) {
                    _this.deactivate(ripple);
                    _this.btnPressup.emit();
                    clearInterval(watcher);
                }
            }, 50);
        });
    };
    RippleBtnDirective.prototype.tapHandler = function (touchDuration) {
        var _this = this;
        this.tapping();
        this.triggerRipple(touchDuration, function (ripple, duration) {
            // wait ripple animation ended
            // wait ripple animation ended
            _this.delay(duration).then(function () { return _this.removeTapRipple(ripple); });
        });
    };
    RippleBtnDirective.prototype.removeTapRipple = function (ripple) {
        var _this = this;
        // wait this.el fadeout completely
        this.delay(this.fadeDuration).then(function () {
            _this.deactivate(ripple);
            _this.btnTapped.emit();
        });
    };
    RippleBtnDirective.prototype.triggerRipple = function (dTouch, callback) {
        var _this = this;
        var btn = this.el;
        var rect = btn.getBoundingClientRect();
        var ripple = btn.querySelector('.ripple');
        if (!ripple) {
            ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.height = ripple.style.width = Math.max(rect.width, rect.height) + 'px';
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '100%';
            ripple.style.transform = 'scale(0.01)';
            ripple.style.display = 'block';
            ripple.style.pointerEvents = 'none';
            this.el.appendChild(ripple);
        }
        var y = this.event.changedTouches[0].pageY;
        var x = this.event.changedTouches[0].pageX;
        var center = {
            x: rect.left + (rect.width / 2),
            y: rect.top + (rect.height / 2),
        };
        var tx = center.x - x;
        var ty = center.y - y;
        var top = y - rect.top - ripple.offsetHeight / 2 - document.body.scrollTop;
        var left = x - rect.left - ripple.offsetWidth / 2 - document.body.scrollLeft;
        ripple.style.top = top + 'px';
        ripple.style.left = left + 'px';
        var bg = this.rippleBackground;
        ripple.style.background = bg + ' radial-gradient(circle, transparent 1%, ' + bg + ' 1%) 50% no-repeat';
        var duration = dTouch < this.interval ? dTouch : this.interval;
        ripple.style.transition = 'all ' + duration + 'ms ease-in-out';
        // Trigger ripple animation
        this.delay(10).then(function () {
            ripple.style.transform = 'scale(1) translate3d(' + tx + 'px,' + ty + 'px, 0)';
            _this.isAnimating = true;
        });
        // Ripple animation end
        this.delay(duration).then(function () { return _this.isAnimating = false; });
        if (typeof callback === "function") {
            callback(ripple, duration);
        }
        return false;
    };
    RippleBtnDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[ripple-btn]',
                    // Attribute selector
                    host: {
                        '(touchstart)': 'onTouchstart($event)',
                        '(touchend)': 'onTouchend($event)'
                    }
                },] },
    ];
    /** @nocollapse */
    RippleBtnDirective.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: Renderer, },
    ]; };
    RippleBtnDirective.propDecorators = {
        "height": [{ type: HostBinding, args: ['style.height',] },],
        "width": [{ type: HostBinding, args: ['style.width',] },],
        "backgroundColor": [{ type: HostBinding, args: ['style.backgroundColor',] },],
        "marginTop": [{ type: HostBinding, args: ['style.marginTop',] },],
        "interval": [{ type: Input },],
        "size": [{ type: Input },],
        "containerClass": [{ type: Input },],
        "wrapperClass": [{ type: Input },],
        "tooltipText": [{ type: Input },],
        "darken": [{ type: Input },],
        "btnTapped": [{ type: Output },],
        "btnPressed": [{ type: Output },],
        "btnPressup": [{ type: Output },],
    };
    return RippleBtnDirective;
}());
export { RippleBtnDirective };
//# sourceMappingURL=ripple-btn.directive.js.map