import { Directive, HostBinding, HostListener } from "@angular/core";

@Directive({
  selector: "[trim]"
})
export class TrimDirective {
  @HostBinding() value: string;

  @HostListener("input", ["$event.target.value"])
  onChange(updatedValue: string) {
    this.value = updatedValue.trim();
  }
}
