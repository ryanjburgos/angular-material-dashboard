import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  template: `
    <mat-form-field class="full-width" appearance="fill">
      <mat-label>{{ label }}</mat-label>
      <input
        matInput
        autocomplete="off"
        [type]="hide ? inputType : 'text'"
        [placeholder]="placeholderValue"
        [disabled]="isDisabled"
        [id]="fieldName"
        [name]="fieldName"
        [value]="value"
        [readonly]="isReadonly"
        (input)="onChange($event)"
        (blur)="touched()"
      />
      <button
        *ngIf="inputType === 'password'"
        mat-icon-button
        matSuffix
        type="button"
        [attr.aria-label]="'Hide password'"
        [attr.aria-pressed]="hide"
        (click)="hide = !hide"
      >
        <mat-icon>{{ hide ? 'visibility_off' : 'visibility' }}</mat-icon>
      </button>
      <ng-container *ngIf="formField?.dirty || formField?.touched">
        <mat-error *ngIf="formField?.hasError('email')"> Please enter a valid email address </mat-error>
        <mat-error *ngIf="formField?.hasError('required')"> required </mat-error>
      </ng-container>
    </mat-form-field>
  `,
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  hide = true;
  /**
   * @Input
   * @public
   * @name forPlaceHolder
   * @param {string}
   * @description for placeHolder
   */
  @Input() public placeholderValue: string = '';

  /**
   * @Input
   * @public
   * @name parentForm
   * @param  {FormGroup}
   * @description to name for FormGroup
   */
  @Input() public parentForm!: FormGroup;

  /**
   * @Input
   * @public
   * @name fieldName
   * @param  {string}
   * @description
   */
  @Input() public fieldName!: string;

  /**
   * @Input
   * @public
   * @name label
   * @param  {string}
   * @description for name of label
   */
  @Input() public label!: string;

  /**
   * @Input
   * @public
   * @name isReadonly
   * @param  {boolean}
   * @description for read only
   */
  @Input() public isReadonly: boolean = false;

  /**
   * @public
   * @name inputType
   * @type {'text' | 'number' | 'email' | 'tel' | 'url'}
   * @description type of input = text
   */
  @Input() public inputType: 'text' | 'number' | 'email' | 'tel' | 'url' | 'date' | 'datetime-local' | 'time' | 'password' = 'text';

  /**
   * @Input
   * @public
   * @name value
   * @param  {string}
   * @description for a value form
   */
  public value!: string;

  /**
   * @public
   * @name changed
   * @param  {value: string}
   * @description the callback function to register on UI change
   */
  public changed!: (value: string) => void;

  /**
   * @public
   * @name touched
   * @description the callback function to register on element touch
   */
  public touched!: () => void;

  /**
   * @public
   * @name isDisabled
   * @param  {boolean}
   * @description use to disabled input
   */
  public isDisabled!: boolean;

  /**
   * @public
   * @name formField
   * @returns {FormControl}
   * @description to name for FormGroup
   */
  public get formField(): FormControl {
    return this.parentForm?.get(this.fieldName) as FormControl;
  }
  constructor() {}

  /**
   * @public
   * @name writeValue
   * @type {string}
   * @param  {value: string}
   * @description This will will write the value to the view if the the value changes
   */
  public writeValue(value: string): void {
    this.value = value;
  }

  /**
   * @public
   * @name onChange
   * @type {Event}
   * @param  {event: Event}
   * @description  This will will write the value to the view if the the value changes
   */
  public onChange(event: Event): void {
    const value: string = (<HTMLInputElement>event.target).value;

    this.changed(value);
  }

  /**
   * @public
   * @name registerOnChange
   * @type {any}
   * @param  {fn: any}
   * @description  When the value in the UI is changed, this method will invoke a callback function
   */
  public registerOnChange(fn: any): void {
    this.changed = fn;
  }

  /**
   * @public
   * @name registerOnTouched
   * @type {any}
   * @param  {fn: any}
   * @description When the element is touched, this method will get called
   */
  public registerOnTouched(fn: any): void {
    this.touched = fn;
  }

  /**
   * @public
   * @name setDisabledState
   * @type {boolean}
   * @param  {isDisabled: boolean}
   * @description this method set to disable state of input
   */
  public setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
