import { Component, EventEmitter, Input, Output } from '@angular/core';

type ClassesProps = {
  label?: string,
  base?: string,
  input?: string,
  labelColor?: string
}
@Component({
  selector: 'app-input-password',
  templateUrl: './input-password.component.html',
  styleUrl: './input-password.component.scss'
})
export class InputPasswordComponent {
  @Input() placeholder: string = '';
  @Input() label: string = '';
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;
  @Input() isFloating: boolean = false;
  @Input() name: string = "";
  @Input() value: string = "";
  @Input() classes?: ClassesProps;
  @Input() error: string = "";
  @Output() valueChange = new EventEmitter<string>();
  type: 'text' | 'password' = 'password'
  isShowPassword: boolean = false


  toggleShowPassword() {
    this.isShowPassword = !this.isShowPassword

    if (this.isShowPassword) {
      this.type = 'text'
    } else {
      this.type = 'password'
    }
    console.log(this.isShowPassword)
  }

  onInputChange(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    this.valueChange.emit(inputValue);
  }
}
