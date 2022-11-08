import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  template: `<button mat-raised-button [color]="colorType" [type]="buttonType" [disabled]="isDisabled" (click)="onClick()">
    <ng-content></ng-content>
  </button>`,
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() colorType: 'primary' | 'accent' | 'warn' | '' = '';
  @Input() buttonType: 'button' | 'submit' | 'menu' | 'reset' = 'button';
  @Input() isDisabled: boolean = false;

  @Output() click$: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  public onClick(): void {
    this.click$.emit();
  }
}
