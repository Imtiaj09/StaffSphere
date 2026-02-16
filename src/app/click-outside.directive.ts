import { Directive, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[appClickOutside]'
})
export class ClickOutsideDirective {

  constructor(private elementRef: ElementRef) { }

  @Output()
  public appClickOutside = new EventEmitter<Event>();

  @HostListener('document:click', ['$event'])
  public onClick(event: Event): void {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.appClickOutside.emit(event);
    }
  }
}
