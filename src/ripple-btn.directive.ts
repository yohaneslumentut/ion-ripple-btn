import { Directive, ElementRef, Input, Output, Renderer, EventEmitter, HostBinding } from '@angular/core';

@Directive({
  selector: '[ripple-btn]', // Attribute selector
  host: {
    '(touchstart)': 'onTouchstart($event)',
    '(touchend)': 'onTouchend($event)'
  }
})
export class RippleBtnDirective {

  // Elements
  el: HTMLElement
  wrapper: any
  container: any
  event: any

  // Dimensions
  containerHeight: number

  // Status
  isActive: boolean = false
  isTapping: boolean = false
  isAnimating: boolean = false
  pressTimeoutRunning: boolean = false

  // Timing
  startTimeStamp: number = 0;
  endTimeStamp: number = 0;
  pressTimeout: any
  fadeDuration: 400
  delay: any

  // Styling
  @HostBinding('style.height') height: string
  @HostBinding('style.width') width: string
  @HostBinding('style.backgroundColor') backgroundColor: string
  @HostBinding('style.marginTop') marginTop: string

  // Host input
  @Input() interval: number;
  @Input() size: number
  @Input() containerClass: string
  @Input() wrapperClass: string
  @Input() tooltipText: string

  @Input()
  set darken(val:boolean) {
    this._darken = typeof val !== 'boolean' || val != true
  }
  get darken(): boolean { return this._darken }

  @Output() btnTapped: EventEmitter<any> = new EventEmitter();
  @Output() btnPressed: EventEmitter<any> = new EventEmitter();
  @Output() btnPressup: EventEmitter<any> = new EventEmitter();

  private _darken: boolean = false
  private activeBackgroundColor: string
  private nonactiveBackgroundColor: string
  private rippleBackground: string

  constructor( el: ElementRef, private renderer: Renderer) {
    this.el = el.nativeElement;
    this.delay = (ms:number) => new Promise(_ => setTimeout(_, ms));
  }

  ngAfterViewInit() {
    this.getWrapperAndContainer();
    this.setBackgroundColor();
    this.setDimensions();
  }

  getWrapperAndContainer() {
    this.wrapper = this.el.children[0].closest('.'+ this.wrapperClass);
    this.container = this.el.children[0].closest('.' + this.containerClass);
    this.containerHeight = this.container.offsetHeight;
  }

  setBackgroundColor() {
    this.activeBackgroundColor = this.darken ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.15)';
    this.nonactiveBackgroundColor = this.darken ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,0)';
    this.rippleBackground = this.darken ?  'rgba(0,0,0,0.05)' : 'rgba(255,255,255, 0.1)';
  }

  setDimensions(){
    let height = this.containerHeight * this.size;
    let heightDif = this.containerHeight - height;
 
    this.width = this.height = height + 'px';
    this.marginTop =  heightDif / 2 + 'px';
    this.renderer.setElementStyle(this.wrapper, 'height', this.containerHeight + 'px')
  }

  activate() {
    this.el.classList.add('ease-out');
    this.backgroundColor = this.activeBackgroundColor;
    this.isActive = true;
  }

  deactivate(ripple:any) {
    if(ripple) ripple.remove();
    this.backgroundColor = this.nonactiveBackgroundColor;
    this.isActive = false;
    this.resetting();
  }

  resetting() {
    this.startTimeStamp = this.endTimeStamp = 0
    this.isTapping = this.isAnimating = false;
  }

  pressing() { this.isTapping = false }

  tapping() { this.isTapping = true }

  onTouchstart(e:any) {

    this.resetting();

    this.event = e
    this.startTimeStamp = e.timeStamp;

    if(!this.isActive){
      this.activate();
      this.startPressWatcher(this.interval);
    }
  }

  startPressWatcher(interval = 400) {
    this.pressTimeoutRunning = true;
    this.pressTimeout = setTimeout(()=>{
      if(!this.isTapping) this.pressHandler(interval);
      this.pressTimeoutRunning = false
    }, interval)
  }

  stopPressWatcher() {
    clearTimeout(this.pressTimeout);
    this.pressTimeoutRunning = false
  }

  onTouchend(e:any) {

    if(this.pressTimeoutRunning) this.stopPressWatcher();

    this.endTimeStamp = e.timeStamp;

    let touchDuration = this.endTimeStamp - this.startTimeStamp;

    // Handle active button & a valid touch lifecycle only
    if(this.isActive && this.startTimeStamp !== 0 && touchDuration > 0){
      
      this.isActive = false;

      // This is a pressing
      if(touchDuration >= this.interval) {
        this.pressUpHandler();
      }
      // This is a tapping
      else {
        this.tapHandler(touchDuration);
      }
    }
  }

  pressUpHandler() {
    this.delay(11).then(() => {if(!this.isAnimating) this.deactivate(null)}) // wait until ripple animated
  }

  pressHandler(touchDuration:number) {
    this.pressing();
    this.triggerRipple(touchDuration, (ripple:any, duration:number) => {

      this.delay(duration).then(() => this.btnPressed.emit(this.event))

      let watcher = setInterval(() => {
        if(!this.isAnimating && !this.isActive){
          this.deactivate(ripple);
          this.btnPressup.emit();
          clearInterval(watcher);
        }
      }, 50)
    });
  }

  tapHandler(touchDuration:number) {
    this.tapping();
    this.triggerRipple(touchDuration, (ripple:any, duration:number) => {
      // wait ripple animation ended
      this.delay(duration).then(() => this.removeTapRipple(ripple))
    });
  }

  removeTapRipple(ripple:any) {
    // wait this.el fadeout completely
    this.delay(this.fadeDuration).then(() => {
      this.deactivate(ripple);
      this.btnTapped.emit();
    })
  }

  triggerRipple(dTouch:number ,callback:any) {
  
    let btn = this.el;
    let rect = btn.getBoundingClientRect();
    
    let ripple = <HTMLElement>btn.querySelector('.ripple');

    if(!ripple){
      
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

    let y = this.event.changedTouches[0].pageY;
    let x = this.event.changedTouches[0].pageX;

    let center = {
      x: rect.left + (rect.width/2),
      y: rect.top + (rect.height/2),
    };

    let tx = center.x-x;
    let ty = center.y-y;

    let top =  y - rect.top - ripple.offsetHeight / 2 - document.body.scrollTop;
    let left = x - rect.left - ripple.offsetWidth / 2 - document.body.scrollLeft;

    ripple.style.top = top + 'px';
    ripple.style.left = left + 'px';

    let bg = this.rippleBackground;
    ripple.style.background =  bg + ' radial-gradient(circle, transparent 1%, '+ bg +' 1%) 50% no-repeat';

    let duration = dTouch < this.interval ? dTouch : this.interval;
    ripple.style.transition = 'all '+ duration +'ms ease-in-out';
    
    // Trigger ripple animation
    this.delay(10).then(() => {
      ripple.style.transform = 'scale(1) translate3d('+ tx +'px,'+ ty + 'px, 0)';
      this.isAnimating = true;
    })

    // Ripple animation end
    this.delay(duration).then(() => this.isAnimating = false )

    if (typeof callback === "function") {
      callback(ripple, duration);
    }

    return false;
  }

}